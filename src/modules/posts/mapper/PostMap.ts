import IPostsResponseDTO from '../dtos/IPostsResponseDTO';
import Post from '../infra/typeorm/entities/Post';
import FormatePostFields from './utils/FormatePostFields';

class PostMap {
  static toDTO({
    id,
    title,
    content,
    user_id,
    created_at,
    updated_at,
    images,
    reactions,
    comments,
    user,
  }: Post): IPostsResponseDTO {
    const post = {
      id,
      title,
      content,
      user_id,
      created_at,
      updated_at,
      images,
      reactions,
      comments,
      user,
    } as Post;

    const formatedPost = { ...post } as IPostsResponseDTO;

    if (images && images.length) {
      const formatedImages = FormatePostFields.images(post);

      formatedPost.images = formatedImages;
    }

    if (reactions && reactions.length) {
      const formatedReactions = FormatePostFields.reactions(post);

      formatedPost.reactions = formatedReactions;
    }

    formatedPost.user = FormatePostFields.user(user);

    return formatedPost;
  }
}

export default PostMap;
