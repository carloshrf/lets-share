import UsersRepositoryInMemory from '../../../accounts/repositories/in-memory/UsersRepositoryInMemory';
import CommentsRepositoryInMemory from '../../repositories/in-memory/CommentsRepositoryInMemory';
import PostsRepositoryInMemory from '../../repositories/in-memory/PostsRepositoryInMemory';
import DeleteCommentUseCase from './DeleteCommentUseCase';

let deleteCommentUseCase: DeleteCommentUseCase;
let commentsRepositoryInMemory: CommentsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let postsRepositoryInMemory: PostsRepositoryInMemory;

describe('Delete Comment', () => {
  beforeEach(() => {
    commentsRepositoryInMemory = new CommentsRepositoryInMemory();
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    deleteCommentUseCase = new DeleteCommentUseCase(
      commentsRepositoryInMemory,
      postsRepositoryInMemory,
      usersRepositoryInMemory
    );
  });

  it('should be able to delete a commentary', async () => {
    const userData = {
      name: 'Indiana Jones',
      email: 'indy_adv_2018@bol.com',
      password: 'cryskull',
    };

    const user = await usersRepositoryInMemory.save(userData);

    const postObj = {
      title: 'Title Test',
      content: 'testing the post test',
      user_id: user.id,
    };

    const post = await postsRepositoryInMemory.save(postObj);

    const commentObj = {
      post_id: post.id,
      user_id: user.id,
      text: 'Comentário de teste',
      comment_reply_id: null,
    };

    const comment = await commentsRepositoryInMemory.save(commentObj);

    await expect(
      deleteCommentUseCase.execute({
        post_id: comment.post_id,
        comment_id: comment.id,
        user_id: comment.user_id,
      })
    ).resolves.not.toThrow();
  });
});
