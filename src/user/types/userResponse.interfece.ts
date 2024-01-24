import { UserType } from './user.type';

export interface UserResposeInterface {
  user: UserType & { token: string };
}
