import { makeAutoObservable, observable } from 'mobx';
import { RootStore } from 'stores/index';
import { BasicStore } from 'system/BasicStore';
import { VKRequest } from 'classes/VKRequest';
import { User } from 'stores/UserStore/types';

export class UserStore implements BasicStore {
  public root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
  }

  @observable
  public accountGetProfileInfo = new VKRequest<User>(
    'account.getProfileInfo',
    'get'
  );

  @observable
  public getUserData = new VKRequest(
      'users.get',
      'get'
  );

  public init() {}
}
