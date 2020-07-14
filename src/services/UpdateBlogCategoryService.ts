import { getRepository } from 'typeorm';
import BlogCategory from '../models/BlogCategory';
import AppError from '../errors/AppError';

interface Request {
  id: number;
  name: string;
}
class UpdateBlogCategoryService {
  public async execute({ id, name }: Request): Promise<BlogCategory> {
    const blogCategoryRepository = getRepository(BlogCategory);
    const blogCategory = await blogCategoryRepository.findOne(id);
    if (name.trim() === '') {
      throw new AppError('Category name is mandatory!', 401);
    }
    if (!blogCategory) {
      throw new AppError('Category does not exists!', 401);
    }
    blogCategory.name = name;
    await blogCategoryRepository.save(blogCategory);
    return blogCategory;
  }
}

export default UpdateBlogCategoryService;
