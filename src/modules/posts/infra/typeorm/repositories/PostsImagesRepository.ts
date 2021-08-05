import { getRepository, Repository } from 'typeorm';

import IPostsImagesRepository from '../../../repositories/IPostsImagesRepository';
import PostsImages from '../entities/PostsImages';

class PostsImagesRepository implements IPostsImagesRepository {
  private repository: Repository<PostsImages>;
  constructor() {
    this.repository = getRepository(PostsImages);
  }

  async create(post_id: string, image_name: string): Promise<PostsImages> {
    const images = this.repository.create({ post_id, name: image_name });

    await this.repository.save(images);

    return images;
  }
  async findByPostId(post_id: string): Promise<PostsImages[]> {
    const image = await this.repository.find({ post_id });

    return image;
  }
  async deleteByImageName(name: string): Promise<void> {
    await this.repository.delete({ name });
  }
}

export default PostsImagesRepository;
