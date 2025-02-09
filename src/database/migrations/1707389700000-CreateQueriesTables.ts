import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateQueriesTables1707389700000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Query table
    await queryRunner.query(`
      CREATE TABLE "query" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "apiId" character varying NOT NULL,
        "interval" integer NOT NULL,
        "selectedAttributes" text array NOT NULL,
        "isActive" boolean NOT NULL DEFAULT true,
        "lastExecuted" TIMESTAMP,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_query_id" PRIMARY KEY ("id")
      )
    `);

    // Create Query Parameter table
    await queryRunner.query(`
      CREATE TABLE "query_parameter" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "value" character varying NOT NULL,
        "queryId" uuid,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_query_parameter_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_query_parameter_query" FOREIGN KEY ("queryId") 
          REFERENCES "query"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order to handle foreign key constraints
    await queryRunner.query(`DROP TABLE "query_parameter"`);
    await queryRunner.query(`DROP TABLE "query"`);
  }
}
