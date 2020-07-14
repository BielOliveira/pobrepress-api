import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Permissions from '../models/Permission';

interface Request {
  userid: number;
  blog: string;
  ecommerce: string;
  admin: string;
}

class PermissionsSetService {
  public async execute({
    userid,
    blog,
    ecommerce,
    admin,
  }: Request): Promise<Permissions> {
    const permissionsRepository = getRepository(Permissions);

    const permissionAlreadySet = await permissionsRepository.findOne({
      where: { userid },
    });

    if (permissionAlreadySet) {
      throw new AppError('Permission is already seted, try to update');
    }

    if (!userid) {
      throw new AppError('The Field userid can not be null or empty!');
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

    const permissions = permissionsRepository.create({
      userid,
      blog,
      ecommerce,
      admin,
    });

    await permissionsRepository.save(permissions);

    return permissions;
  }
}

export default PermissionsSetService;
