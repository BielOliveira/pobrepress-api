import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';

import MediaUploadService from '../services/MediaUploadService';
import MediaDescriptionSetService from '../services/MediaDescriptionSetService';
import Image from '../models/Image';

const mediasRoute = Router();
const upload = multer(uploadConfig);

mediasRoute.get('/', async (request, response) => {
  const mediasRepository = getRepository(Image);

  const medias = await mediasRepository.find();
  return response.json(medias);
});

mediasRoute.post('/', upload.single('media'), async (request, response) => {
  const mediaUpload = new MediaUploadService();

  const media = await mediaUpload.execute({
    uploadedFileName: request.file.filename,
  });
  return response.json(media);
});

mediasRoute.patch('/', async (request, response) => {
  const { id, description } = request.body;

  const mediaDescriptionSet = new MediaDescriptionSetService();

  const media = await mediaDescriptionSet.execute({
    id,
    description,
  });

  return response.json(media);
});

export default mediasRoute;
