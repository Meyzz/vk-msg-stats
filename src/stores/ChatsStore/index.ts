import { makeAutoObservable } from 'mobx';
import { VKRequest } from 'classes/VKRequest';
import { GetChatsResponse } from 'stores/ChatsStore/types';
import {
  loadChatsExecute,
} from 'stores/ChatsStore/loadChats';

export class ChatsStore {
  constructor() {
    makeAutoObservable(this);
  }

  public activePage: number = 1;

  public searchValue: string = '';

  public getChatsList = new VKRequest<GetChatsResponse>('execute', 'get', {
    code: loadChatsExecute({
      extended: 1,
      count: 10,
      offset: (this.activePage - 1) * 10,
    }),
  });

  public searchChatsList = new VKRequest<GetChatsResponse>('execute', 'get');

  public setActivePage = (page: number) => {
    this.activePage = page;
  };

  public setSearchValue = (value: string) => {
    this.searchValue = value;
  }
}
