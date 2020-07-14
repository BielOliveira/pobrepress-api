import { Router } from 'express';
import { getRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateBlogCategoryService from '../services/CreateBlogCategoryService';
import DeleteBlogCategoryService from '../services/DeleteBlogCategoryService';
import UpdateBlogCategoryService from '../services/UpdateBlogCategoryService';
import BlogCategory from '../models/BlogCategory';

const blogCategoryRoute = Router();

blogCategoryRoute.get('/', async (request, response) => {
  const blogCategoryRepository = getRepository(BlogCategory);
  const blogCategories = await blogCategoryRepository.find();
  response.json(blogCategories);
});

blogCategoryRoute.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteBlogCategory = new DeleteBlogCategoryService();

  await deleteBlogCategory.execute(Number(id));

  response.status(204).send();
});

blogCategoryRoute.post('/', ensureAuthenticated, async (request, response) => {
  const { name } = request.body;
  const createBlogCategory = new CreateBlogCategoryService();

  const blogCategory = await createBlogCategory.execute({
    userid: Number(request.user.id),
    name,
  });

  response.json(blogCategory);
});

blogCategoryRoute.put('/', ensureAuthenticated, async (request, response) => {
  const { id, name } = request.body;
  const createBlogCategory = new UpdateBlogCategoryService();

  const blogCategory = await createBlogCategory.execute({
    id,
    name,
  });

  response.json(blogCategory);
});

export default blogCategoryRoute;
