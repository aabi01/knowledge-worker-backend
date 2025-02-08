import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBooksTable1707379200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "book" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "author" character varying NOT NULL,
        "genre" character varying NOT NULL,
        "price" decimal(10,2) NOT NULL,
        "availability" boolean NOT NULL,
        "rating" decimal(3,1) NOT NULL,
        "publishDate" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_book_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "book"`);
  }
}
