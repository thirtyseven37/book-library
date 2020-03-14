import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BooksModule } from '../src/books/books.module';
import { BooksService } from '../src/books/books.service';

describe('Book controller (e2e)', () => {
  let app: INestApplication;
  let booksService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BooksModule],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET books`, () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect({
        data: booksService.findAll(),
      });
  });

  it(`/POST books with valid book`, () => {
    return request(app.getHttpServer())
      .post('/books')
      .send({name: 'john'})
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
