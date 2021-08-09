import ISaveCommentDTO from '../../dtos/ISaveCommentDTO';
import Comment from '../../infra/typeorm/entities/Comment';
import ICommentsRepository from '../ICommentsRepository';

class CommentsRepositoryInMemory implements ICommentsRepository {
  private comments: Comment[] = [];

  async save({
    id,
    text,
    post_id,
    user_id,
    comment_reply_id,
  }: ISaveCommentDTO): Promise<Comment> {
    if (!id) {
      const comment = new Comment();

      Object.assign(comment, {
        text,
        post_id,
        user_id,
        comment_reply_id,
      });

      this.comments.push(comment);

      return comment;
    }

    const index = this.comments.findIndex((item) => item.id === id);

    this.comments[index] = { ...this.comments[index], text, comment_reply_id };

    return this.comments[index];
  }
  async findById(id: string): Promise<Comment> {
    const comment = this.comments.find((comment) => comment.id === id);

    return comment;
  }
  async findByPostId(post_id: string): Promise<Comment[]> {
    const comment = this.comments.filter((comment) => comment.id === post_id);

    return comment;
  }

  async delete(id: string): Promise<void> {
    const index = this.comments.findIndex((comment) => comment.id === id);

    this.comments.splice(index, 1);
  }
}

export default CommentsRepositoryInMemory;
