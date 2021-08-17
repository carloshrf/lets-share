import ISaveReactionDTO from '../dtos/ISaveReactionDTO';
import Reaction from '../infra/typeorm/entities/Reaction';

export default interface IReactionsRepository {
  save({ id, name, image }: ISaveReactionDTO): Promise<Reaction>;
  findById(id: string): Promise<Reaction>;
  findByName(name: string): Promise<Reaction>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Reaction[]>;
}
