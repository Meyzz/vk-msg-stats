export interface GetChatsResponse {
  chats: {
    count: number;
    items: Chat[];
    profiles: Array<{
      first_name: string;
      last_name: string;
      photo_50: string;
      id: number;
    }>;
    groups?: Array<{ id: number; name: string; photo_50: string }>;
  };
  histories: Array<{
    id: number;
    count: number;
  }>;
}

export interface Chat {
  conversation: {
    peer: {
      id: number;
      local_id: number;
      type: 'user' | 'chat' | 'group';
    };
    chat_settings?: {
      title: string;
      photo: {
        photo_50: string;
      };
    };
  };
}
