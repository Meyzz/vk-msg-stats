import { ProfileInfo } from 'stores/types';

export interface GetDialogInfoResp {
  count: number;
  profiles: ProfileInfo[];
}

export interface HistoryMessageResp {
  date: number;
  out: number;
  attachments: Array<{
    type: 'audio_message';
    audio_message?: {
      duration: number;
      owner_id: number;
    };
  }>;
}

export interface AnalysisResults {
  all: {
    from: number;
    to: number;
    count: number;
  };
  voice: {
    count: number;
    from: number;
    to: number;
  };
  dates: AnalysisDates;
  checkedCount: number;
}

export interface AnalysisDates {
  [year: number]: {
    [month: number]: {
      count: number;
      from: number;
      to: number;
    };
  };
}

export interface LoadHistoryResp {
  messages: Array<HistoryMessageResp[] | null>;
}

export enum AnalysisState {
  INACTIVE,
  ACTIVE,
  DONE,
}
