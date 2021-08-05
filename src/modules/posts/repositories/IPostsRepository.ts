import ISavePostDTO from '../dtos/ISavePostDTO';
import Post from '../infra/typeorm/entities/Post';

export default interface IPostsRepository {
  save({ id, content, title, user_id }: ISavePostDTO): Promise<Post>;
  findAll(): Promise<Post[]>;
  findPostsByUser(user_id: string): Promise<Post[]>;
  findPostById(id: string): Promise<Post>;
  delete(id: string): Promise<void>;
}
