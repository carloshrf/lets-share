import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListPostsByUserUseCase from './ListPostsByUserUseCase';

class ListPostsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listPostsByUserUseCase = container.resolve(ListPostsByUserUseCase);

    const posts = await listPostsByUserUseCase.execute(user_id);

    return response.json(posts);
  }
}

export default ListPostsByUserController;
