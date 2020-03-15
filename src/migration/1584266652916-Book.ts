import {MigrationInterface, QueryRunner} from "typeorm";

export class Book1584266652916 implements MigrationInterface {
    name = 'Book1584266652916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" text NOT NULL, "author" text NOT NULL, "isbn" text NOT NULL, "pages" integer NOT NULL, "rating" integer NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "book"`, undefined);
    }

}
