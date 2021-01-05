import React from 'react';
import { ChatsStore } from 'stores/ChatsStore';
import { DialogStore } from 'stores/DialogStore';
import { UserStore } from 'stores/UserStore';

export interface Stores {
  chatsStore: ChatsStore;
  dialogStore: DialogStore;
  userStore: UserStore;
}

export const storesContext = React.createContext({
  chatsStore: new ChatsStore(),
  dialogStore: new DialogStore(),
  userStore: new UserStore(),
});
