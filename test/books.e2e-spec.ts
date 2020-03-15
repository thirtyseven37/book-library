import { Connection } from 'typeorm';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Book } from '../src/books/book.entity';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from '../src/books/books.module';

describe('Book controller (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.e2e',
        }),
        TypeOrmModule.forRoot(),
        BooksModule,
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    connection = module.get(Connection);
    await app.init();
  });

  beforeEach(async () => {
    await connection.manager.clear(Book);
    await connection.manager.query("ALTER SEQUENCE books_id_seq RESTART;")
  });

  it(`/GET books with empty table`, () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect([])
  });

  it(`/POST books with no json included`, () => {
    return request(app.getHttpServer())
      .post('/books')
      .set('Content-Type', 'application/json')
      .expect(400)
  });

  it(`/POST books with empty title`, () => {
    return request(app.getHttpServer())
      .post('/books')
      .send({
        title: "",
        author: "Joseph Heller",
        isbn: "978-3-16-148410-0",
        pages: 123,
        rating: 5
      })
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Bad Request',
        error: [ 'title must be longer than or equal to 1 characters' ]
      })
  });

  it(`/POST books with invalid rate`, () => {
    return request(app.getHttpServer())
      .post('/books')
      .send({
        title: "Catch 22",
        author: "Joseph Heller",
        isbn: "978-3-16-148410-0",
        pages: 123,
        rating: 7
      })
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Bad Request',
        error: [ 'rating must not be greater than 5' ]
      });
  });

  it(`/POST valid books and get proper /GET result`, async () => {
    await request(app.getHttpServer())
      .post('/books')
      .send({
        title: "Catch 22",
        author: "Joseph Heller",
        isbn: "978-3-16-148410-0",
        pages: 123,
        rating: 5
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/books')
      .send({
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "978-3-16-148410-0",
        pages: 123,
        rating: 5
      })
      .expect(201);

    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect([
        {
          id: 1,
          title: 'Catch 22',
          author: 'Joseph Heller',
          isbn: '978-3-16-148410-0',
          pages: 123,
          rating: 5
        },
        {
          id: 2,
          title: 'Clean Code',
          author: 'Robert C. Martin',
          isbn: '978-3-16-148410-0',
          pages: 123,
          rating: 5
        }
      ]);
  });

  it(`try to /PUT not existing book`, async () => {
    return request(app.getHttpServer())
      .put('/books/2')
      .send({
        title: "Catch 22",
        author: "Joseph Heller",
        isbn: "978-3-16-148410-0",
        pages: 123,
        rating: 5
      })
      .expect(404)
  });

  it(`/POST valid books, /GET result, /PATCH book and /GET proper result`, async () => {
    await request(app.getHttpServer())
      .post('/books')
      .send({
        title: "Catch 22",
        author: "Joseph Heller",
        isbn: "978-3-16-148410-0",
        pages: 123,
        rating: 5
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/books')
      .send({
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "978-3-16-148410-0",
        pages: 123,
        rating: 5
      })
      .expect(201);

    await request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect([
        {
          id: 1,
          title: 'Catch 22',
          author: 'Joseph Heller',
          isbn: '978-3-16-148410-0',
          pages: 123,
          rating: 5
        },
        {
          id: 2,
          title: 'Clean Code',
          author: 'Robert C. Martin',
          isbn: '978-3-16-148410-0',
          pages: 123,
          rating: 5
        }
      ]);

    await request(app.getHttpServer())
      .put('/books/2')
      .send({
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "978-3-16-148410-0",
        pages: 2137,
        rating: 5
      })
      .expect(200);

    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect([
        {
          id: 1,
          title: 'Catch 22',
          author: 'Joseph Heller',
          isbn: '978-3-16-148410-0',
          pages: 123,
          rating: 5
        },
        {
          id: 2,
          title: 'Clean Code',
          author: 'Robert C. Martin',
          isbn: '978-3-16-148410-0',
          pages: 2137,
          rating: 5
        }
      ]);
  });

  afterAll(async () => {
    await app.close();
  });
});
