import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Permissions from '../models/Permission';

interface Request {
  id: number;
  blog: string;
  ecommerce: string;
  admin: string;
}

class PermissionsUpdateService {
  public async execute({
    id,
    blog,
    ecommerce,
    admin,
  }: Request): Promise<Permissions> {
    const permissionsRepository = getRepository(Permissions);

    if (!id) {
      throw new AppError('The Field id can not be null or empty!');
    }

    if (!blog) {
      throw new AppError('The Field blog can not be null or empty!');
    }

    if (!ecommerce) {
      throw new AppError('The Field ecommerce can not be null or empty!');
    }

    if (!admin) {
      throw new AppError('The Field admin can not be null or empty!');
    }

    const permissions = await permissionsRepository.findOne({ where: { id } });

    if (!permissions) {
      throw new AppError('Permissions related not found!', 401);
    } else {
      permissions.blog = blog;
      permissions.ecommerce = ecommerce;
      permissions.admin = admin;
      await permissionsRepository.save(permissions);
      return permissions;
    }
  }
}

export default PermissionsUpdateService;
