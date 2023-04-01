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

  async findAll() {
    const blog = await this.blogRepository.find();
    blog.map((blog) => {
      const c = cheerio.load(blog.content);
      blog.content = c('p').text();
      return blog;
    });
    return blog;
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
