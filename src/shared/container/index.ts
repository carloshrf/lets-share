import { container } from 'tsyringe';

import './providers/StorageProvider';

import UsersRepository from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../../modules/accounts/repositories/IUsersRepository';
import CommentsRepository from '../../modules/posts/infra/typeorm/repositories/CommentsRepository';
import PostsImagesRepository from '../../modules/posts/infra/typeorm/repositories/PostsImagesRepository';
import PostsRepository from '../../modules/posts/infra/typeorm/repositories/PostsRepository';
import ReactedPostsRepository from '../../modules/posts/infra/typeorm/repositories/ReactedPostsRepository';
import ReactionsRepository from '../../modules/posts/infra/typeorm/repositories/ReactionsRepository';
import ICommentsRepository from '../../modules/posts/repositories/ICommentsRepository';
import IPostsImagesRepository from '../../modules/posts/repositories/IPostsImagesRepository';
import IPostsRepository from '../../modules/posts/repositories/IPostsRepository';
import IReactedPostsRepository from '../../modules/posts/repositories/IReactedPostsRepository';
import IReactionsRepository from '../../modules/posts/repositories/IReactionsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository
);

container.registerSingleton<IPostsImagesRepository>(
  'PostsImagesRepository',
  PostsImagesRepository
);

container.registerSingleton<IReactedPostsRepository>(
  'ReactedPostsRepository',
  ReactedPostsRepository
);

container.registerSingleton<IReactionsRepository>(
  'ReactionsRepository',
  ReactionsRepository
);

container.registerSingleton<ICommentsRepository>(
  'CommentsRepository',
  CommentsRepository
);
