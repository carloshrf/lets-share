import { getRepository, Repository } from 'typeorm';

import ISaveUserDTO from '../../../dtos/ISaveUserDTO';
import IUsersRepository from '../../../repositories/IUsersRepository';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async save({
    id,
    name,
    email,
    password,
    isAdmin,
    avatar,
  }: ISaveUserDTO): Promise<User> {
    if (!id) {
      const user = this.repository.create({
        name,
        email,
        password,
        isAdmin,
      });

      const newUser = await this.repository.save(user);

      return newUser;
    }

    const newUser = await this.repository.save({
      id,
      name,
      email,
      password,
      isAdmin,
      avatar,
    });

    return newUser;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async isAdmin(id: string): Promise<boolean> {
    const user = await this.repository.findOne(id);

    return user.isAdmin;
  }
}

export default UsersRepository;
