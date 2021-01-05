import { makeAutoObservable, observable } from 'mobx';
import { VKRequest } from 'classes/VKRequest';
import {
  AnalysisResults,
  AnalysisState,
  GetDialogInfoResp,
  LoadHistoryResp,
} from 'stores/DialogStore/types';
import { loadHistory } from 'stores/DialogStore/loadHistory';

const LOAD_TIMES = 25;
const LOAD_AT_ONCE = 200;

const initialResults: AnalysisResults = {
  checkedCount: 0,
  all: {
    count: 0,
    from: 0,
    to: 0,
  },
  voice: {
    from: 0,
    count: 0,
    to: 0,
  },
  dates: {},
};

export class DialogStore {
  constructor() {
    makeAutoObservable(this);
  }

  public analysisState = AnalysisState.INACTIVE;

  @observable
  public getDialogInfo = new VKRequest<GetDialogInfoResp>(
    'messages.getHistory',
    'get',
    {
      extended: 1,
      count: 1,
    }
  );

  public results: AnalysisResults = { ...initialResults };

  public getMessagesHistory = new VKRequest<LoadHistoryResp>('execute', 'get');

  public startAnalysis = (id: number, count: number) => {
    this.analysisState = AnalysisState.ACTIVE;
    this.results = { ...initialResults, all: { ...initialResults.all, count } };
    const needLoads = Math.ceil(count / (LOAD_AT_ONCE * LOAD_TIMES));
    this.loadPartHistory(id, 0, needLoads);
  };

  public loadPartHistory = (
    id: number,
    loadedCount: number,
    needLoads: number
  ) => {
    if (this.analysisState === AnalysisState.ACTIVE) {
      this.getMessagesHistory
        .fetch({
          code: loadHistory(
            loadedCount * LOAD_TIMES * LOAD_AT_ONCE,
            LOAD_TIMES,
            id
          ),
        })
        .then((resp) => {
          const loadAgain = loadedCount !== needLoads;
          this.loadPartHistorySuccess(resp);
          if (loadAgain) {
            setTimeout(() => {
              this.loadPartHistory(id, loadedCount + 1, needLoads);
            }, 350);
          } else {
            this.handleAnalysisDone();
          }
        });
    }
  };

  public handleAnalysisDone = () => {
    this.analysisState = AnalysisState.DONE;
    // TODO добавить сохранение в chrome.storage.sync
  };

  public loadPartHistorySuccess = (resp: LoadHistoryResp | undefined) => {
    if (resp) {
      const newResults = { ...this.results };
      resp.messages.forEach((messagesArr) => {
        if (messagesArr) {
          messagesArr.forEach((message) => {
            if (message) {
              // dates
              const date = new Date(message.date * 1000);
              const year = date.getFullYear();
              const month = date.getMonth();
              if (!newResults.dates[year]) {
                newResults.dates[year] = {};
              }
              let dateObj = newResults.dates[year][month];
              if (!dateObj) {
                newResults.dates[year][month] = { count: 0, from: 0, to: 0 };
                dateObj = newResults.dates[year][month];
              }
              dateObj.count = dateObj.count + 1;

              // all
              newResults.checkedCount = newResults.checkedCount + 1;
              if (message.out) {
                newResults.all.to = newResults.all.to + 1;

                // date
                dateObj.to = dateObj.to + 1;
              } else {
                newResults.all.from = newResults.all.from + 1;

                //date
                dateObj.from = dateObj.from + 1;
              }

              // attachments
              if (message.attachments.length) {
                message.attachments.forEach((attachment) => {
                  if (attachment.audio_message) {
                    newResults.voice.count =
                      newResults.voice.count +
                      attachment.audio_message.duration;
                    if (message.out) {
                      newResults.voice.to =
                        newResults.voice.to + attachment.audio_message.duration;
                    } else {
                      newResults.voice.from =
                        newResults.voice.from +
                        attachment.audio_message.duration;
                    }
                  }
                });
              }
            }
          });
        }
      });
      this.results = newResults;
    }
  };

  public stopAnalysis = () => {
    this.results = { ...initialResults };
    this.analysisState = AnalysisState.INACTIVE;
    this.getMessagesHistory.reset();
  };
}
