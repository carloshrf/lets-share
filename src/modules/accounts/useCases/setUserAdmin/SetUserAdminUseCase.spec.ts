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
    const userData1 = {
      name: 'Indiana Jones',
      email: 'indy_adv_2018@bol.com',
      password: 'cryskull',
    };

    const userData2 = {
      name: 'Carl Johnson',
      email: 'cj@yahoo.com',
      password: 'agaragam',
    };

    const user1 = await usersRepositoryInMemory.save(userData1);
    const user2 = await usersRepositoryInMemory.save(userData2);

    const isAdmin = await setUserAdminUseCase.execute({
      user_id: user1.id,
      userIdToAdmin: user2.id,
      isAdmin: true,
    });

    expect(isAdmin.isAdmin).toBe(true);

    const isNotAdmin = await setUserAdminUseCase.execute({
      user_id: user1.id,
      userIdToAdmin: user2.id,
      isAdmin: false,
    });

    expect(isNotAdmin.isAdmin).toBe(false);
  });
});
