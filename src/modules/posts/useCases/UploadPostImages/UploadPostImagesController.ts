import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UploadPostImagesUseCase from './UploadPostImagesUseCase';

interface IFiles {
  filename: string;
}

class UploadPostImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: post_id } = request.params;
    const images = request.files as IFiles[];

    const uploadPostsImages = container.resolve(UploadPostImagesUseCase);

    const images_name = images.map((image) => image.filename);

    await uploadPostsImages.execute({ post_id, images_name });

    return response.status(204).json();
  }
}

export default UploadPostImagesController;
