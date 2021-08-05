import PostsRepositoryInMemory from '../../repositories/in-memory/PostsRepositoryInMemory';
import UpdatePostUseCase from './UpdatePostUseCase';

let updatePostUseCase: UpdatePostUseCase;
let postsRepositoryInMemory: PostsRepositoryInMemory;

describe('Update Post', () => {
  beforeAll(() => {
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    updatePostUseCase = new UpdatePostUseCase(postsRepositoryInMemory);
  });

  it("should be able to update user's own post", async () => {
    const postData = {
      title: 'Custom title',
      content: 'It is just a little and simple content',
      user_id: '12345',
    };

    const post = await postsRepositoryInMemory.save(postData);

    const updatedPostData = {
      id: post.id,
      title: 'Updated title',
      content: 'this is an updated content',
      user_id: '12345',
    };

    const updatedPost = await updatePostUseCase.execute(updatedPostData);

    expect(updatedPost).toEqual(updatedPostData);
  });
});
