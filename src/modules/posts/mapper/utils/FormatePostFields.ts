import User from '../../../accounts/infra/typeorm/entities/User';
import {
  IFormatedImages,
  IFormatedReactions,
  IFormatedUser,
} from '../../dtos/IPostsResponseDTO';
import Post from '../../infra/typeorm/entities/Post';

class FormatePostFields {
  static images(post: Post): IFormatedImages[] {
    const formatedImages = post.images.map((image) => {
      return {
        id: image.id,
        url: `${process.env.APP_API_URL}/images/${image.name}`,
      };
    });

    return formatedImages;
  }

  static reactions(post: Post): IFormatedReactions[] {
    const reactions = post.reactions.map(
      ({ id, post_id, reaction_id, user_id }) => ({
        id,
        post_id,
        reaction_id,
        user_id,
      })
    );

    return reactions;
  }

  static user(user: User): IFormatedUser {
    const { name, avatar } = user;
    return {
      name,
      avatar: `${process.env.APP_API_URL}/avatar/${avatar}`,
    };
  }
}

export default FormatePostFields;
