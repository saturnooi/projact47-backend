import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import * as cheerio from 'cheerio';
@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  create(createBlogDto: CreateBlogDto) {
    return this.blogRepository.save(createBlogDto);
  }

  async findAll(page = 1, limit = 10, searchQuery?: string) {
    const skip = (page - 1) * limit;
    const queryBuilder = this.blogRepository.createQueryBuilder('blog');

    if (searchQuery) {
      queryBuilder.where(
        'blog.topic LIKE :searchQuery OR blog.content LIKE :searchQuery',
        { searchQuery: `%${searchQuery}%` },
      );
    }

    const [blogs, total] = await queryBuilder
      .orderBy('blog.create_at', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    blogs.forEach((blog) => {
      const c = cheerio.load(blog.content);
      blog.content = c('p').text();
    });

    return {
      data: blogs,
      currentPage: page,
      perPage: limit,
      total,
      lastPage: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.blogRepository.findOneBy({ id: id });
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return this.blogRepository.update(id, updateBlogDto);
  }

  remove(id: number) {
    this.blogRepository.delete(id);
  }
}
