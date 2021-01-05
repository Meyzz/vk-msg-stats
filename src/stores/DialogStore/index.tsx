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
  count: 0,
  fromCount: 0,
  toCount: 0,
  fromVoice: 0,
  fullVoice: 0,
  toVoice: 0,
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
    this.results = { ...initialResults, count };
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
              newResults.checkedCount = newResults.checkedCount + 1;
              if (message.out) {
                newResults.toCount = newResults.toCount + 1;
              } else {
                newResults.fromCount = newResults.fromCount + 1;
              }
              if (message.attachments.length) {
                message.attachments.forEach((attachment) => {
                  if (attachment.audio_message) {
                    newResults.fullVoice =
                      newResults.fullVoice + attachment.audio_message.duration;
                    if (message.out) {
                      newResults.toVoice =
                        newResults.toVoice + attachment.audio_message.duration;
                    } else {
                      newResults.fromVoice =
                        newResults.fromVoice +
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
