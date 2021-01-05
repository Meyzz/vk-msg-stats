import { observable } from 'mobx';
import { VKRequest } from 'classes/VKRequest';
import { User } from 'stores/UserStore/types';

export class UserStore {
  @observable
  public accountGetProfileInfo = new VKRequest<User>(
    'account.getProfileInfo',
    'get'
  );

  @observable
  public getUserData = new VKRequest('users.get', 'get');
}
