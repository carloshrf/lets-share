import ISaveCommentDTO from '../dtos/ISaveCommentDTO';
import Comment from '../infra/typeorm/entities/Comment';

export default interface ICommentsRepository {
  save({
    id,
    post_id,
    text,
    user_id,
    comment_reply_id,
  }: ISaveCommentDTO): Promise<Comment>;
  findById(id: string): Promise<Comment>;
  findByPostId(post_id: string): Promise<Comment[]>;
  delete(id: string): Promise<void>;
}
