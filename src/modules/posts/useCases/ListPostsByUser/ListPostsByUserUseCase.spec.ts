import PostsRepositoryInMemory from '../../repositories/in-memory/PostsRepositoryInMemory';
import ListPostsByUserUseCase from './ListPostsByUserUseCase';

let listPostsByUserUseCase: ListPostsByUserUseCase;
let postsRepositoryInMemory: PostsRepositoryInMemory;

describe('List posts By User', () => {
  beforeAll(() => {
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    listPostsByUserUseCase = new ListPostsByUserUseCase(
      postsRepositoryInMemory
    );
  });

  it('should be able to list all posts from specific user', async () => {
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

    const posts = await listPostsByUserUseCase.execute('12345');

    expect(posts.length).toBe(1);
    expect(posts[0].user_id).toBe(post1.user_id);
  });
});
