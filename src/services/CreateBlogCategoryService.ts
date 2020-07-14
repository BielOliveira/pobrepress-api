import { getRepository } from 'typeorm';

import BlogCategory from '../models/BlogCategory';
import AppError from '../errors/AppError';

interface Request {
  userid: number;
  name: string;
}

class CreateBlogCategoryService {
  public async execute({ userid, name }: Request): Promise<BlogCategory> {
    const blogCategoryRepository = getRepository(BlogCategory);
    const categoryAlreadyExists = await blogCategoryRepository.findOne({
      where: { name },
    });

    if (name.trim() === '') {
      throw new AppError('Category name is mandatory', 401);
    }
    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!', 401);
    }

    const blogCategory = blogCategoryRepository.create({
      userid,
      name,
    });

    await blogCategoryRepository.save(blogCategory);

    // const blogCategory = { userid, name };

    return blogCategory;
  }
}

export default CreateBlogCategoryService;
