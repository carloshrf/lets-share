import { inject, injectable } from 'tsyringe';

import Reaction from '../../infra/typeorm/entities/Reaction';
import IReactionsRepository from '../../repositories/IReactionsRepository';

@injectable()
class ListReactionsUseCase {
  constructor(
    @inject('ReactionsRepository')
    private reactionsRepository: IReactionsRepository
  ) {}
  async execute(): Promise<Reaction[]> {
    const reactions = await this.reactionsRepository.findAll();

    return reactions;
  }
}

export default ListReactionsUseCase;
