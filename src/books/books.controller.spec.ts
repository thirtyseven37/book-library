import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

class BookServiceMock {
  async findAll(): Promise<Book[]> {
    return [];
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return null;
  }
}

describe('Books Controller', () => {
  let booksController: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: BooksService,
        useValue: new BookServiceMock(),
      }],
      controllers: [BooksController],
    }).compile();

    booksController = module.get(BooksController);
    service = module.get(BooksService);
  });

  it('should be defined', () => {
    expect(booksController).toBeDefined();
  });

  it('should return an array of books', async () => {
    const result: Book[] = [
      {
        id: 1,
        author: 'Joseph Heller',
        title: 'Catch 22',
        isbn: '123',
        pages: 537,
        rating: 5,
      }
    ];

    jest.spyOn(service, 'findAll').mockImplementation(async () => result);

    expect(await booksController.findAll()).toBe(result);
  })
});
