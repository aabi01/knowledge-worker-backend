import { Injectable } from '@nestjs/common';
import { QuerySeeder } from './query.seeder';
import { BookSeeder } from './book.seeder';

@Injectable()
export class SeederService {
  constructor(
    private readonly querySeeder: QuerySeeder,
    private readonly bookSeeder: BookSeeder,
  ) {}

  async seed() {
    try {
      await this.querySeeder.seed();
      await this.bookSeeder.seed();
      console.log('Database seeding completed successfully');
    } catch (error) {
      console.error('Database seeding failed:', error);
      throw error;
    }
  }
}
