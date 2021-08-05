import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListAllPostsUseCase from './ListAllPostsUseCase';

class ListAllPostsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllPostsUseCase = container.resolve(ListAllPostsUseCase);

    const posts = await listAllPostsUseCase.execute();

    return response.json(posts);
  }
}

export default ListAllPostsController;
