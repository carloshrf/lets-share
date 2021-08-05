import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
import ShowProfileUseCase from './ShowProfileUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let showProfileUseCase: ShowProfileUseCase;

describe('User Profile', () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    showProfileUseCase = new ShowProfileUseCase(usersRepositoryInMemory);
  });

  it('should be able to show the user profile', async () => {
    const userData = {
      name: 'Indiana Jones',
      email: 'indy_adv_2018@bol.com',
      password: 'cryskull',
      isAdmin: false,
    };

    const user = await usersRepositoryInMemory.save(userData);

    const profile = await showProfileUseCase.execute(user.id);

    expect(profile).toHaveProperty('id');
    expect(profile).toHaveProperty('name');
    expect(profile.name).toBe(userData.name);
    expect(profile.email).toBe(userData.email);
  });
});
