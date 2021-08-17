import ISaveReactionDTO from '../../dtos/ISaveReactionDTO';
import Reaction from '../../infra/typeorm/entities/Reaction';
import IReactionsRepository from '../IReactionsRepository';

class ReactionsRepositoryInMemory implements IReactionsRepository {
  private reactions: Reaction[] = [];

  async save({ id, name, image }: ISaveReactionDTO): Promise<Reaction> {
    if (!id) {
      const reaction = new Reaction();
      Object.assign(reaction, {
        name,
        image,
      });

      this.reactions.push(reaction);
    }

    const index = this.reactions.findIndex((reaction) => reaction.id === id);

    this.reactions[index] = { ...this.reactions[index], name, image };

    return this.reactions[index];
  }
  async findById(id: string): Promise<Reaction> {
    const reaction = this.reactions.find((reaction) => reaction.id === id);

    return reaction;
  }
  async findByName(name: string): Promise<Reaction> {
    const reaction = this.reactions.find((reaction) => reaction.name === name);

    return reaction;
  }
  async delete(id: string): Promise<void> {
    const index = this.reactions.findIndex((reaction) => reaction.id === id);

    this.reactions.splice(index, 1);
  }
  async findAll(): Promise<Reaction[]> {
    return this.reactions;
  }
}

export default ReactionsRepositoryInMemory;
