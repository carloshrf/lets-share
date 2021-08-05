import { classToClass } from 'class-transformer';

import IUserResponse from '../dtos/IUserResponseDTO';
import User from '../infra/typeorm/entities/User';

class UserMap {
  static toDTO({
    id,
    name,
    email,
    isAdmin,
    created_at,
    updated_at,
    avatar,
    avatar_url,
  }: User): IUserResponse {
    const user = classToClass({
      id,
      name,
      email,
      isAdmin,
      created_at,
      updated_at,
      avatar,
      avatar_url,
    });

    return user;
  }
}

export default UserMap;
