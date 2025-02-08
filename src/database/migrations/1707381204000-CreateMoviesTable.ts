import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMoviesTable1707381204000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "movie" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "director" character varying NOT NULL,
        "genre" character varying NOT NULL,
        "releaseDate" character varying NOT NULL,
        "rating" decimal(2,1) NOT NULL,
        "duration" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_movie_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "movie"`);
  }
}
