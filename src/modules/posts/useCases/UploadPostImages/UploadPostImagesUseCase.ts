import { inject, injectable } from 'tsyringe';

import IStorageProvider from '../../../../shared/container/providers/StorageProvider/IStorageProvider';
import IPostsImagesRepository from '../../repositories/IPostsImagesRepository';

interface IRequest {
  post_id: string;
  images_name: Array<string>;
}

@injectable()
class UploadPostImagesUseCase {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    @inject('PostsImagesRepository')
    private postsImagesRepository: IPostsImagesRepository
  ) {}

  async execute({ post_id, images_name }: IRequest): Promise<void> {
    const postsImages = await this.postsImagesRepository.findByPostId(post_id);

    if (postsImages.length) {
      postsImages.forEach(async (image) => {
        await this.postsImagesRepository.deleteByImageName(image.name);
        await this.storageProvider.delete(image.name, 'posts');
      });
    }

    images_name.forEach(async (image) => {
      await this.postsImagesRepository.create(post_id, image);
      await this.storageProvider.save(image, 'posts');
    });
  }
}

export default UploadPostImagesUseCase;
