import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SetUserAdminUseCase from './SetUserAdminUseCase';

class SetUserAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.params;
    const userIdToAdmin = request.user.id;
    const { isAdmin } = request.body;

    const setUserAdminUseCase = container.resolve(SetUserAdminUseCase);

    const user = await setUserAdminUseCase.execute({
      user_id,
      isAdmin,
      userIdToAdmin,
    });

    return response.json(user);
  }
}

export default SetUserAdminController;
