import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateReactionUseCase from './CreateReactionUseCase';

class CreateReactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;
    const image = request.file.filename;

    const createReactionUseCase = container.resolve(CreateReactionUseCase);

    const reaction = await createReactionUseCase.execute({ image, name });

    return response.status(204).json(reaction);
  }
}

export default CreateReactionController;
