import PostsImages from '../infra/typeorm/entities/PostsImages';

export default interface IPostsImagesRepository {
  create(post_id: string, image_name: string): Promise<PostsImages>;
  findByPostId(post_id: string): Promise<PostsImages[]>;
  deleteByImageName(name: string): Promise<void>;
}
