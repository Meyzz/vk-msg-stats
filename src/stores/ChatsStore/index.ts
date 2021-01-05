import { observable } from 'mobx';
import { VKRequest } from 'classes/VKRequest';
import { GetChatsResponse } from 'stores/ChatsStore/types';
import { loadChatsExecute } from 'stores/ChatsStore/loadChats';

export class ChatsStore {
  @observable
  public getChatsList = new VKRequest<GetChatsResponse>('execute', 'get', {
    code: loadChatsExecute({ extended: 1, count: 10 }),
  });
}
