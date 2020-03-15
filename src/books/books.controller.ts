import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async getAll() {
    return await this.bookService.findAll();
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    await this.bookService.create(createBookDto);
    return createBookDto;
  }

  @Patch()
  update() {

  }
}
