import ReactionsRepositoryInMemory from '../../repositories/in-memory/ReactionsRepositoryInMemory';
import ListReactionsUseCase from './ListReactionsUseCase';

let reactionsRepositoryInMemory: ReactionsRepositoryInMemory;
let listReactionsUseCase: ListReactionsUseCase;

describe('List Reactions', () => {
  beforeAll(() => {
    reactionsRepositoryInMemory = new ReactionsRepositoryInMemory();
    listReactionsUseCase = new ListReactionsUseCase(
      reactionsRepositoryInMemory
    );
  });
  it('should be able to list all reactions', async () => {
    const reaction1 = {
      image: 'image1',
      name: 'like',
    };

    const reaction2 = {
      image: 'image2',
      name: 'love',
    };

    await reactionsRepositoryInMemory.save(reaction1);
    await reactionsRepositoryInMemory.save(reaction2);

    const reactions = await listReactionsUseCase.execute();

    expect(reactions.length).toBe(2);
    expect(reactions[0].name).toBe(reaction1.name);
    expect(reactions[1].image).toBe(reaction2.image);
  });
});
