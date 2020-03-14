module.exports = {
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  type: 'postgres',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: ['dist/migration/*.js'],
  cli: { 'migrationsDir': 'src/migration' },
};

