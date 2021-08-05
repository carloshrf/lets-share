import { Router } from 'express';

import postRouter from './posts.routes';
import userRouter from './users.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);

export default router;
