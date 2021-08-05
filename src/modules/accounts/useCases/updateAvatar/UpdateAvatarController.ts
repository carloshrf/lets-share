import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAvatarUseCase from './UpdateAvatarUseCase';

class UpdateAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const avatar_file = request.file.filename;

    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);

    await updateAvatarUseCase.execute({ user_id, avatar_file });

    return response.status(204).json();
  }
}

export default UpdateAvatarController;
