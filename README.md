## Description

Simple CRUD for book library. Used technologies:
* [TypeScript](https://github.com/microsoft/TypeScript)
* [Nest](https://github.com/nestjs/nest)
* [TypeORM](https://github.com/typeorm/typeorm)


## Installation

```bash
$ npm install
$ cp .env.example .env
$ cp .env.example .env.e2e
```

Use your DB credentials in .env file & in .env.e2e and make sure you use entities like this in .env.e2e (tests do not use transpiled code)
```bash
ORM_ENTITIES = src/**/*.entity{.ts,.js}
```

After run migrations (not necessary if you use dev mode)
```bash
$ npm run migrate-up
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test


```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Stay in touch

- Author - [Patryk Sienkiewicz](https://github.com/thirtyseven37)

