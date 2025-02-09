import { Injectable } from '@nestjs/common';
import { QuerySeeder } from './query.seeder';
import { BookSeeder } from './book.seeder';
import { MovieSeeder } from './movie.seeder';
import { ApiRepositorySeeder } from './api-repository.seeder';
import { DataSource } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(
    private readonly querySeeder: QuerySeeder,
    private readonly bookSeeder: BookSeeder,
    private readonly movieSeeder: MovieSeeder,
    private readonly apiRepositorySeeder: ApiRepositorySeeder,
    private readonly dataSource: DataSource,
  ) {}

  async seed() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.apiRepositorySeeder.seed(queryRunner);
      await this.bookSeeder.seed(queryRunner);
      await this.movieSeeder.seed(queryRunner);
      await this.querySeeder.seed(queryRunner);
      
      await queryRunner.commitTransaction();
      console.log('Database seeding completed successfully');
    } catch (error) {
      console.error('Database seeding failed:', error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
