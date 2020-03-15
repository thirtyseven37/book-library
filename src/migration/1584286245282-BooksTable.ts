import {MigrationInterface, QueryRunner} from "typeorm";

export class BooksTable1584286245282 implements MigrationInterface {
    name = 'BooksTable1584286245282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "title" text NOT NULL, "author" text NOT NULL, "isbn" text NOT NULL, "pages" integer NOT NULL, "rating" integer NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "books"`, undefined);
    }

}
