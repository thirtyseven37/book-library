import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
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
}
