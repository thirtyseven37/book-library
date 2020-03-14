import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('Books Controller', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
      controllers: [BooksController],
    }).compile();

    controller = module.get(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
