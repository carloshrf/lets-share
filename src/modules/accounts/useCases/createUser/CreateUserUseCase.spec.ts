import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
import CreateUserUseCase from './CreateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to create a new user', async () => {
    const userData = {
      name: 'Indiana Jones',
      email: 'indy_adv_2018@bol.com',
      password: 'cryskull',
    };

    const user = await createUserUseCase.execute(userData);

    expect(user).toHaveProperty('id');
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
  });
});
