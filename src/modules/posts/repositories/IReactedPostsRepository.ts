import IPostUserReaction from '../dtos/IPostUserReaction';
import ISaveReactedPostDTO from '../dtos/ISaveReactedPostDTO';
import ReactedPost from '../infra/typeorm/entities/ReactedPost';

export default interface IReactedPostsRepository {
  save({
    reaction_id,
    user_id,
    post_id,
  }: ISaveReactedPostDTO): Promise<ReactedPost>;
  findByPostId(post_id: string): Promise<ReactedPost[]>;
  findPostUserReaction({
    post_id,
    user_id,
  }: IPostUserReaction): Promise<ReactedPost>;
  delete(id: string): Promise<void>;
}
