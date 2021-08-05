import PostsRepositoryInMemory from '../../repositories/in-memory/PostsRepositoryInMemory';
import ListAllPostsUseCase from './ListAllPostsUseCase';

let listAllPostsUseCase: ListAllPostsUseCase;
let postsRepositoryInMemory: PostsRepositoryInMemory;

describe('List all posts', () => {
  beforeAll(() => {
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    listAllPostsUseCase = new ListAllPostsUseCase(postsRepositoryInMemory);
  });

  it('should be able to list all posts', async () => {
    const post1 = {
      title: 'Custom title',
      content: 'It is just a little and simple content',
      user_id: '12345',
    };

    const post2 = {
      title: 'Another post',
      content: 'here is the second post',
      user_id: '32132',
    };

    await postsRepositoryInMemory.save(post1);
    await postsRepositoryInMemory.save(post2);

    const posts = await listAllPostsUseCase.execute();

    expect(posts.length).toBe(2);
    expect(posts[0].user_id).toBe(post1.user_id);
    expect(posts[1].user_id).toBe(post2.user_id);
  });
});
