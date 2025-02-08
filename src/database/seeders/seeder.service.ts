import { Injectable } from '@nestjs/common';
import { QuerySeeder } from './query.seeder';
import { BookSeeder } from './book.seeder';
import { MovieSeeder } from './movie.seeder';

@Injectable()
export class SeederService {
  constructor(
    private readonly querySeeder: QuerySeeder,
    private readonly bookSeeder: BookSeeder,
    private readonly movieSeeder: MovieSeeder,
  ) {}

  async seed() {
    try {
      await this.querySeeder.seed();
      await this.bookSeeder.seed();
      await this.movieSeeder.seed();
      console.log('Database seeding completed successfully');
    } catch (error) {
      console.error('Database seeding failed:', error);
      throw error;
    }
  }
}
