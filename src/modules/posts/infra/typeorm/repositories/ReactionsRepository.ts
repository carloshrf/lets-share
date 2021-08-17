import ISaveReactionDTO from 'modules/posts/dtos/ISaveReactionDTO';
import { getRepository, Repository } from 'typeorm';

import IReactionsRepository from '../../../repositories/IReactionsRepository';
import Reaction from '../entities/Reaction';

class ReactionsRepository implements IReactionsRepository {
  private repository: Repository<Reaction>;

  constructor() {
    this.repository = getRepository(Reaction);
  }

  async save({ id, name, image }: ISaveReactionDTO): Promise<Reaction> {
    if (id) {
      const reaction = await this.repository.save({ id, name, image });
      return reaction;
    }

    const reactionObj = this.repository.create({ name, image });
    const reaction = await this.repository.save(reactionObj);

    return reaction;
  }

  async findById(id: string): Promise<Reaction> {
    const reaction = await this.repository.findOne(id);

    return reaction;
  }

  async findByName(name: string): Promise<Reaction> {
    const reaction = await this.repository.findOne({ name });

    return reaction;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findAll(): Promise<Reaction[]> {
    return this.repository.find();
  }
}
export default ReactionsRepository;
