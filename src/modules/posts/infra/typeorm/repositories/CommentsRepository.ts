import { getRepository, Repository } from 'typeorm';

import ISaveCommentDTO from '../../../dtos/ISaveCommentDTO';
import ICommentsRepository from '../../../repositories/ICommentsRepository';
import Comment from '../entities/Comment';

class CommentsRepository implements ICommentsRepository {
  private repository: Repository<Comment>;

  constructor() {
    this.repository = getRepository(Comment);
  }

  async save({
    id,
    text,
    post_id,
    user_id,
    comment_reply_id,
  }: ISaveCommentDTO): Promise<Comment> {
    if (!id) {
      const commentObj = this.repository.create({
        post_id,
        user_id,
        text,
        comment_reply_id,
      });

      const comment = await this.repository.save(commentObj);

      return comment;
    }

    const comment = await this.repository.save({
      id,
      text,
      post_id,
      user_id,
      comment_reply_id,
    });

    return comment;
  }

  async findById(id: string): Promise<Comment> {
    const comment = await this.repository.findOne(id);

    return comment;
  }

  async findByPostId(post_id: string): Promise<Comment[]> {
    const comment = await this.repository.find({ post_id });

    return comment;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default CommentsRepository;
