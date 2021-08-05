import ISaveUserDTO from '../dtos/ISaveUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  save({ id, name, email, password, isAdmin }: ISaveUserDTO): Promise<User>;
  findById(user_id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  isAdmin(id: string): Promise<boolean>;
}
