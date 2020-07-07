import { Router } from 'express';
import { getRepository } from 'typeorm';

import Permission from '../models/Permission';
import PermissionsSetService from '../services/PermissionsSetService';
import PermissionsUpdateService from '../services/PermissionsUpdateService';

const permissionsRouter = Router();

permissionsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const permissionsRepository = getRepository(Permission);

  const permissions = await permissionsRepository.findOne({
    where: { userid: id },
  });

  return response.json(permissions);
});

permissionsRouter.put('/', async (request, response) => {
  const { id, blog, ecommerce, admin } = request.body;

  const createPermissions = new PermissionsUpdateService();

  const permissions = await createPermissions.execute({
    id,
    blog,
    admin,
    ecommerce,
  });

  return response.json(permissions);
});

permissionsRouter.post('/', async (request, response) => {
  const { userid, blog, ecommerce, admin } = request.body;

  const createPermissions = new PermissionsSetService();

  const permissions = await createPermissions.execute({
    userid,
    blog,
    admin,
    ecommerce,
  });

  return response.json(permissions);
});

export default permissionsRouter;
