import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListReactionsUseCase from './ListReactionsUseCase';

class ListReactionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const reactionsUseCase = container.resolve(ListReactionsUseCase);
    const reactions = await reactionsUseCase.execute();

    return response.json(reactions);
  }
}

export default ListReactionsController;
