module.exports = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  type: 'postgres',
  entities: [process.env.ORM_ENTITIES],
  synchronize: true,
  migrations: ['dist/migration/*.js'],
  cli: { 'migrationsDir': 'src/migration' },
};

