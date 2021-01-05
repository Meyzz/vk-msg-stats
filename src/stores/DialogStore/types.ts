import { ProfileInfo } from 'stores/types';

export interface GetDialogInfoResp {
  count: number;
  profiles: ProfileInfo[];
}

export interface HistoryMessageResp {
  date: number;
  out: number;
}

export interface AnalysisResults {
  fromCount: number;
  toCount: number;
  count: number;
  checkedCount: number;
}

export interface LoadHistoryResp {
  messages: Array<HistoryMessageResp[] | null>;
}

export enum AnalysisState {
  INACTIVE,
  ACTIVE,
  DONE
}
