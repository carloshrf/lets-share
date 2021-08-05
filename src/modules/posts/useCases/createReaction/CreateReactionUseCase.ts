import { inject, injectable } from 'tsyringe';

import IStorageProvider from '../../../../shared/container/providers/StorageProvider/IStorageProvider';
import { AppError } from '../../../../shared/errors/AppError';
import ISaveReactionDTO from '../../dtos/ISaveReactionDTO';
import Reaction from '../../infra/typeorm/entities/Reaction';
import IReactionsRepository from '../../repositories/IReactionsRepository';

@injectable()
class CreateReactionUseCase {
  constructor(
    @inject('ReactionsRepository')
    private reactionsRepository: IReactionsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}
  async execute({ image, name }: ISaveReactionDTO): Promise<Reaction> {
    const reactionExists = await this.reactionsRepository.findByName(name);

    if (reactionExists) {
      throw new AppError('reaction name already exists');
    }

    const reaction = await this.reactionsRepository.save({
      name,
      image,
    });

    await this.storageProvider.save(image, 'reactions');

    return reaction;
  }
}

export default CreateReactionUseCase;
