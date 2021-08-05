import Comment from '../infra/typeorm/entities/Comment';
import PostsImages from '../infra/typeorm/entities/PostsImages';
import ReactedPost from '../infra/typeorm/entities/ReactedPost';

export interface IFormatedImages {
  id: string;
  url: string;
}

export interface IFormatedReactions {
  id: string;
  post_id: string;
  reaction_id: string;
  user_id: string;
}

export interface IFormatedUser {
  name: string;
  avatar: string;
}

export default interface IPostsResponseDTO {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  images: Array<IFormatedImages | PostsImages>;
  reactions: IFormatedReactions[] | ReactedPost;
  comments: Comment[];
  user: IFormatedUser;
}
