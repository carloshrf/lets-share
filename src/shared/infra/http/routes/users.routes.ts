import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import AuthenticateUserController from '../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import CreateUserController from '../../../../modules/accounts/useCases/createUser/CreateUserController';
import SetUserAdminController from '../../../../modules/accounts/useCases/setUserAdmin/SetUserAdminController';
import ShowProfileController from '../../../../modules/accounts/useCases/showProfile/ShowProfileController';
import UpdateAvatarController from '../../../../modules/accounts/useCases/updateAvatar/UpdateAvatarController';
import { ensureAuthenticated, ensureAdmin } from '../middlewares';

const userRouter = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const setUserAdminController = new SetUserAdminController();
const updateAvatarController = new UpdateAvatarController();
const showProfileController = new ShowProfileController();

const upload = multer(uploadConfig);

userRouter.post('/', createUserController.handle);
userRouter.get(
  '/profile/:id',
  ensureAuthenticated,
  showProfileController.handle
);
userRouter.post(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateAvatarController.handle
);
userRouter.post(
  '/admin/:id',
  ensureAuthenticated,
  ensureAdmin,
  setUserAdminController.handle
);
userRouter.post('/sessions', authenticateUserController.handle);

export default userRouter;
