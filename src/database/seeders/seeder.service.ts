import { Injectable } from '@nestjs/common';
import { QuerySeeder } from './query.seeder';
import { BookSeeder } from './book.seeder';
import { MovieSeeder } from './movie.seeder';
import { ApiRepositorySeeder } from './api-repository.seeder';

@Injectable()
export class SeederService {
  constructor(
    private readonly querySeeder: QuerySeeder,
    private readonly bookSeeder: BookSeeder,
    private readonly movieSeeder: MovieSeeder,
    private readonly apiRepositorySeeder: ApiRepositorySeeder,
  ) {}

  async seed() {
    try {
      await this.apiRepositorySeeder.seed();
      await this.bookSeeder.seed();
      await this.movieSeeder.seed();
      await this.querySeeder.seed();
      console.log('Database seeding completed successfully');
    } catch (error) {
      console.error('Database seeding failed:', error);
      throw error;
    }
  }
}
