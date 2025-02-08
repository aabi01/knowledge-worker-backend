import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateApiRepositoryTables1707389400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create API table
    await queryRunner.query(`
      CREATE TABLE "api" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "endpoint" character varying NOT NULL,
        "description" character varying NOT NULL,
        "availableAttributes" text array NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_api_id" PRIMARY KEY ("id")
      )
    `);

    // Create API Parameter table
    await queryRunner.query(`
      CREATE TABLE "api_parameter" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "description" character varying NOT NULL,
        "required" boolean NOT NULL,
        "defaultValue" character varying,
        "apiId" uuid,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_api_parameter_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_api_parameter_api" FOREIGN KEY ("apiId") 
          REFERENCES "api"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order to handle foreign key constraints
    await queryRunner.query(`DROP TABLE "api_parameter"`);
    await queryRunner.query(`DROP TABLE "api"`);
  }
}
