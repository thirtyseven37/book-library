import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async findAll() {
    return await this.bookService.findAll();
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.bookService.create(createBookDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() createBookDto: CreateBookDto) {
    return await this.bookService.update(id, createBookDto);
  }
}
