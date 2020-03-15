import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = new Book();
    book.author = createBookDto.author;
    book.isbn = createBookDto.isbn;
    book.pages = createBookDto.pages;
    book.rating = createBookDto.rating;
    book.title = createBookDto.title;

    return await this.bookRepository.save(book);
  }

  async update(id: number, createBookDto: CreateBookDto): Promise<Book> {
    const book = await this.bookRepository.findOne(id);

    if (!book) {
      throw new NotFoundException(`Book with id ${id} does not exist`);
    }

    book.author = createBookDto.author;
    book.isbn = createBookDto.isbn;
    book.pages = createBookDto.pages;
    book.rating = createBookDto.rating;
    book.title = createBookDto.title;

    await this.bookRepository.update(id, book);

    return book;
  }

  async delete(id: number): Promise<boolean> {
    const book = await this.bookRepository.findOne(id);

    if (!book) {
      throw new NotFoundException(`Book with id ${id} does not exist`);
    }

    await this.bookRepository.delete(id);

    return null;
  }
}
