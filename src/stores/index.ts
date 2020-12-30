import { UserStore } from 'stores/UserStore';
import {ChatsStore} from "stores/ChatsStore";

export class RootStore {
  public userStore: UserStore;
  public chatsStore: ChatsStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.chatsStore = new ChatsStore(this);

    this.userStore.init();
    this.chatsStore.init();
  }
}
