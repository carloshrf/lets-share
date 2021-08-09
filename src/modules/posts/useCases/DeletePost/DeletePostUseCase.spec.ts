import { AppError } from '../../../../shared/errors/AppError';
import UsersRepositoryInMemory from '../../../accounts/repositories/in-memory/UsersRepositoryInMemory';
import PostsRepositoryInMemory from '../../repositories/in-memory/PostsRepositoryInMemory';
import DeletePostUseCase from './DeletePostUseCase';

let postsRepositoryInMemory: PostsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let deletePostUseCase: DeletePostUseCase;

describe('Delete Post', () => {
  beforeAll(() => {
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    deletePostUseCase = new DeletePostUseCase(
      usersRepositoryInMemory,
      postsRepositoryInMemory
    );
  });

  it('should be able to the post author delete its own posts', async () => {
    const userData = {
      name: 'Indiana Jones',
      email: 'indy_adv_2018@bol.com',
      password: 'cryskull',
    };

    const user = await usersRepositoryInMemory.save(userData);

    const postData = {
      title: 'Custom title',
      content: 'It is just a little and simple content',
      user_id: user.id,
    };

    const post = await postsRepositoryInMemory.save(postData);

    await expect(
      deletePostUseCase.execute({
        post_id: post.id,
        user_id: user.id,
      })
    ).resolves.not.toThrow();
  });

  it('should not be able to a default user delete a post by another author', async () => {
    const userData1 = {
      name: 'Indiana Jones',
      email: 'indy_adv_2018@bol.com',
      password: 'cryskull',
    };

    const userData2 = {
      name: 'Lara Croft',
      email: 'ilvadv@bol.com',
      password: 'dangerous',
    };

    const user1 = await usersRepositoryInMemory.save(userData1);
    const user2 = await usersRepositoryInMemory.save(userData2);

    const postData = {
      title: 'Custom title',
      content: 'It is just a little and simple content',
      user_id: user2.id,
    };

    const post = await postsRepositoryInMemory.save(postData);

    await expect(
      deletePostUseCase.execute({
        post_id: post.id,
        user_id: user1.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to an admin user delete any post', async () => {
    const userData = {
      id: '88888888',
      name: 'Indiana Jones',
      email: 'indy_adv_2018@bol.com',
      password: 'cryskull',
    };

    const user = await usersRepositoryInMemory.save(userData);

    const adminUserData = {
      id: '000000000',
      name: 'administrator',
      email: 'admin@bol.com',
      password: 'imtheboss',
      isAdmin: true,
    };

    const admin = await usersRepositoryInMemory.save(adminUserData);

    const postData1 = {
      title: 'Custom title',
      content: 'It is just a little and simple content',
      user_id: user.id,
    };

    const postData2 = {
      title: 'Another Custom title',
      content: 'It is just a second little and simple content',
      user_id: admin.id,
    };

    const post1 = await postsRepositoryInMemory.save(postData1);
    const post2 = await postsRepositoryInMemory.save(postData2);

    await expect(
      deletePostUseCase.execute({
        post_id: post1.id,
        user_id: admin.id,
      })
    ).resolves.not.toThrow();

    await expect(
      deletePostUseCase.execute({
        post_id: post2.id,
        user_id: admin.id,
      })
    ).resolves.not.toThrow();
  });
});
