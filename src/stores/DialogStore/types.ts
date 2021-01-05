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
    }
  }>;
}

export interface AnalysisResults {
  fromCount: number;
  toCount: number;
  count: number;
  fullVoice: number;
  fromVoice: number;
  toVoice: number;
  checkedCount: number;
}

export interface LoadHistoryResp {
  messages: Array<HistoryMessageResp[] | null>;
}

export enum AnalysisState {
  INACTIVE,
  ACTIVE,
  DONE,
}
