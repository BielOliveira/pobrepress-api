import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Image from '../models/Image';

interface Request {
  uploadedFileName: string;
}

class MediaUploadService {
  public async execute({ uploadedFileName }: Request): Promise<Image> {
    const imageRepository = getRepository(Image);
    const imageExists = await imageRepository.findOne({
      where: { name: uploadedFileName },
    });

    if (imageExists) {
      throw new AppError('This file name already is in the database');
    }

    const image = imageRepository.create({ name: uploadedFileName });
    await imageRepository.save(image);
    return image;
  }
}

export default MediaUploadService;
