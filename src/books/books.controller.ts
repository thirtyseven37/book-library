import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  getAll() {
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return createBookDto;
  }

  @Patch()
  update() {

  }
}
