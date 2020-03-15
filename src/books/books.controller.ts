import { Response } from 'express';
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
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

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    await this.bookService.delete(id);

    res.status(HttpStatus.NO_CONTENT).send();
  }
}
