import CommentsRepositoryInMemory from '../../repositories/in-memory/CommentsRepositoryInMemory';
import PostsRepositoryInMemory from '../../repositories/in-memory/PostsRepositoryInMemory';
import CreateCommentUseCase from './CreateCommentUseCase';

let createCommentUseCase: CreateCommentUseCase;
let commentsRepositoryInMemory: CommentsRepositoryInMemory;
let postsRepositoryInMemory: PostsRepositoryInMemory;

describe('Create Comment', () => {
  beforeAll(() => {
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    commentsRepositoryInMemory = new CommentsRepositoryInMemory();
    createCommentUseCase = new CreateCommentUseCase(
      commentsRepositoryInMemory,
      postsRepositoryInMemory
    );
  });

  it('should be able to create a comment', async () => {
    const postObj = {
      title: 'Title Test',
      content: 'testing the post test',
      user_id: '123',
    };

    const post = await postsRepositoryInMemory.save(postObj);

    const commentObj = {
      post_id: post.id,
      user_id: postObj.user_id,
      text: 'Comentário de teste',
      comment_reply_id: null,
    };

    const comment = await createCommentUseCase.execute(commentObj);

    expect(comment).toHaveProperty('id');
    expect(comment.user_id).toBe('123');
    expect(comment.text).toBe(commentObj.text);
  });

  it('should be able to reply a comment', async () => {
    const postObj = {
      title: 'Title Test',
      content: 'testing the post test',
      user_id: '123',
    };

    const post = await postsRepositoryInMemory.save(postObj);

    const commentObj1 = {
      post_id: post.id,
      user_id: postObj.user_id,
      text: 'Comentário de teste',
      comment_reply_id: null,
    };

    const comment1 = await createCommentUseCase.execute(commentObj1);

    const commentObj2 = {
      post_id: post.id,
      user_id: '666',
      text: 'Respondendo o comentário de teste',
      comment_reply_id: comment1.id,
    };

    const comment2 = await createCommentUseCase.execute(commentObj2);

    expect(comment2).toHaveProperty('id');
    expect(comment2.user_id).toBe(commentObj2.user_id);
    expect(comment2.text).toBe(commentObj2.text);
    expect(comment2.comment_reply_id).toBe(commentObj2.comment_reply_id);
  });
});
