import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRoute = Router();

usersRoute.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRoute.get('/', ensureAuthenticated, async (request, response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();

  const serializedUsers = users.map(user => {
    delete user.password;
    return user;
  });

  return response.json(serializedUsers);
});

export default usersRoute;
