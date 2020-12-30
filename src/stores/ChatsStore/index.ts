import { observable } from 'mobx';
import { RootStore } from 'stores/index';
import { BasicStore } from 'system/BasicStore';
import { VKRequest } from 'classes/VKRequest';
import { User } from 'stores/UserStore/types';
import { Chat, GetChatsResponse } from 'stores/ChatsStore/types';
import { loadChatsExecute } from 'stores/ChatsStore/loadChats';

export class ChatsStore implements BasicStore {
  public root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
  }

  @observable
  public getChatsList = new VKRequest<GetChatsResponse>('execute', 'get', {
    code: loadChatsExecute({ extended: 1, count: 10 }),
  });

  public init() {}
}
