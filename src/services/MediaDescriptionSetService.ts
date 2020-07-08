import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Image from '../models/Image';

interface Request {
  id: number;
  description: string;
}

class MediaDescriptionSetService {
  public async execute({ id, description }: Request): Promise<Image> {
    const mediaRepository = getRepository(Image);
    const media = await mediaRepository.findOne({
      where: {
        id,
      },
    });

    if (!media) {
      throw new AppError('Media not found!', 401);
    }

    media.description = description;
    await mediaRepository.save(media);
    return media;
  }
}

export default MediaDescriptionSetService;
