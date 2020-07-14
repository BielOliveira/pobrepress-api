import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import BlogCategory from '../models/BlogCategory';

class DeleteBlogCategoryService {
  public async execute(id: number): Promise<void> {
    const blogCategoryRepository = getRepository(BlogCategory);
    const blogCategory = await blogCategoryRepository.findOne(id);
    if (!blogCategory) {
      throw new AppError('Category does not exists!', 401);
    }

    await blogCategoryRepository.remove(blogCategory);
  }
}

export default DeleteBlogCategoryService;
