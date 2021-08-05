import { v4 as uuidV4 } from 'uuid';

import ISaveUserDTO from '../../dtos/ISaveUserDTO';
import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async save({
    id,
    name,
    email,
    password,
    isAdmin,
  }: ISaveUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: id || uuidV4(),
      name,
      email,
      password,
      isAdmin,
    });

    this.users.push(user);

    return user;
  }

  async findById(user_id: string): Promise<User> {
    const user = this.users.find((user) => user.id === user_id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
}

export default UsersRepositoryInMemory;
