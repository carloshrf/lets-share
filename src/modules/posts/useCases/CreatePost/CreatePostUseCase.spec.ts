import PostsRepositoryInMemory from '../../repositories/in-memory/PostsRepositoryInMemory';
import CreatePostUseCase from './CreatePostUseCase';

let createPostUseCase: CreatePostUseCase;
let postsRepositoryInMemory: PostsRepositoryInMemory;

describe('Create Post', () => {
  beforeAll(() => {
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    createPostUseCase = new CreatePostUseCase(postsRepositoryInMemory);
  });

  it('should be able to create a Post', async () => {
    const post = {
      title: 'Custom title',
      content: 'It is just a little and simple content',
      user_id: '12345',
    };

    const newPost = await createPostUseCase.execute(post);

    expect(newPost).toHaveProperty('id');
    expect(newPost.user_id).toBe(post.user_id);
    expect(newPost.title).toBe(post.title);
    expect(newPost.content).toBe(post.content);
  });
});
