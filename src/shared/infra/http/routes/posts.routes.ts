import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import AddPostReactionController from '../../../../modules/posts/useCases/addPostReaction/AddPostReactionController';
import CreateCommentController from '../../../../modules/posts/useCases/createComment/CreateCommentController';
import CreatePostController from '../../../../modules/posts/useCases/createPost/CreatePostController';
import CreateReactionController from '../../../../modules/posts/useCases/createReaction/CreateReactionController';
import DeleteCommentController from '../../../../modules/posts/useCases/deleteComment/DeleteCommentController';
import DeletePostController from '../../../../modules/posts/useCases/deletePost/DeletePostController';
import ListAllPostsController from '../../../../modules/posts/useCases/listAllPosts/ListAllPostsController';
import ListPostsByUserController from '../../../../modules/posts/useCases/listPostsByUser/ListPostsByUserController';
import UpdatePostController from '../../../../modules/posts/useCases/updatePost/UpdatePostController';
import UploadPostImagesController from '../../../../modules/posts/useCases/uploadPostImages/UploadPostImagesController';
import { ensureAuthenticated } from '../middlewares';

const postRouter = Router();

const createPostController = new CreatePostController();
const listAllPostsController = new ListAllPostsController();
const listPostsByUserController = new ListPostsByUserController();
const deletePostController = new DeletePostController();
const updatePostController = new UpdatePostController();
const uploadPostImagesController = new UploadPostImagesController();
const addPostReactionController = new AddPostReactionController();
const createReactionController = new CreateReactionController();
const createCommentController = new CreateCommentController();
const deleteCommentController = new DeleteCommentController();

const upload = multer(uploadConfig);

postRouter.post('/', ensureAuthenticated, createPostController.handle);
postRouter.post('/:id', ensureAuthenticated, updatePostController.handle);
postRouter.post(
  '/comments/:post_id',
  ensureAuthenticated,
  createCommentController.handle
);
postRouter.delete(
  '/comments/:comment_id',
  ensureAuthenticated,
  deleteCommentController.handle
);
postRouter.post(
  '/reaction/create/:name',
  ensureAuthenticated,
  upload.single('image'),
  createReactionController.handle
);
postRouter.post(
  '/reaction/:id',
  ensureAuthenticated,
  addPostReactionController.handle
);
postRouter.post(
  '/images/:id',
  ensureAuthenticated,
  upload.array('images'),
  uploadPostImagesController.handle
);
postRouter.delete('/:id', ensureAuthenticated, deletePostController.handle);
postRouter.get('/', ensureAuthenticated, listAllPostsController.handle);
postRouter.get(
  '/:user_id',
  ensureAuthenticated,
  listPostsByUserController.handle
);

export default postRouter;
