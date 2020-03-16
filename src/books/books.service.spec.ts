import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';

class BookRepositoryMock {}

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: 'BookRepository',
          useClass: BookRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
