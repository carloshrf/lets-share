import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
import SetUserAdminUseCase from './SetUserAdminUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let setUserAdminUseCase: SetUserAdminUseCase;

describe('Set User Admin', () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    setUserAdminUseCase = new SetUserAdminUseCase(usersRepositoryInMemory);
  });

  it('should be able to change the user admin value', async () => {
    const userData = {
      name: 'Indiana Jones',
      email: 'indy_adv_2018@bol.com',
      password: 'cryskull',
    };

    const user = await usersRepositoryInMemory.save(userData);
    const isAdmin = await setUserAdminUseCase.execute({
      user_id: user.id,
      isAdmin: true,
    });

    expect(isAdmin.isAdmin).toBe(true);

    const isNotAdmin = await setUserAdminUseCase.execute({
      user_id: user.id,
      isAdmin: false,
    });

    expect(isNotAdmin.isAdmin).toBe(false);
  });
});
