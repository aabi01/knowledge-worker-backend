import { Injectable } from '@nestjs/common';
import { QuerySeeder } from './query.seeder';

@Injectable()
export class SeederService {
  constructor(
    private readonly querySeeder: QuerySeeder,
  ) {}

  async seed() {
    try {
      await this.querySeeder.seed();
      console.log('Database seeding completed successfully');
    } catch (error) {
      console.error('Database seeding failed:', error);
      throw error;
    }
  }
}
