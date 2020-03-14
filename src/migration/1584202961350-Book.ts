import {MigrationInterface, QueryRunner} from "typeorm";

export class Book1584202961350 implements MigrationInterface {
    name = 'Book1584202961350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book_entity" ("id" SERIAL NOT NULL, "title" text NOT NULL, "author" text NOT NULL, "isbn" text NOT NULL, "pages" integer NOT NULL, "rating" integer NOT NULL, CONSTRAINT "PK_3ea5638ccafa8799838e68fad46" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "book_entity"`, undefined);
    }

}
