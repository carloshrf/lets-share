import { inject, injectable } from 'tsyringe';

import IReactedPostsRepository from '../../repositories/IReactedPostsRepository';

interface IRequest {
  post_id: string;
  reaction_id: string;
  user_id: string;
}

@injectable()
class AddPostReactionUseCase {
  constructor(
    @inject('ReactedPostsRepository')
    private reactedPostsRepository: IReactedPostsRepository
  ) {}

  async execute({ post_id, reaction_id, user_id }: IRequest): Promise<void> {
    const reaction = await this.reactedPostsRepository.findPostUserReaction({
      post_id,
      user_id,
    });

    if (reaction && reaction.reaction_id === reaction_id) {
      await this.reactedPostsRepository.delete(reaction.id);
    } else {
      await this.reactedPostsRepository.save({ post_id, reaction_id, user_id });
    }
  }
}

export default AddPostReactionUseCase;
