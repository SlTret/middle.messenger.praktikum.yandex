import { HTTP } from '../http/Http';
import { BaseAPI } from './base-api';

const usersAPIInstance = new HTTP('/user');

export class UsersAPI extends BaseAPI {

    public changeUserProfile(data:object) {
      return usersAPIInstance.put('/profile', data)
    }

    public changeAvatar(data:FormData) {
        return usersAPIInstance.put('/profile/avatar', data)
    }

    public changeUserPassword(data:object) {
        return usersAPIInstance.put('/password', data)
    }

  }
