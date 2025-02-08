import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Query } from '../../api/queries/entities/query.entity';
import { MOCKED_QUERIES } from './seed-data/queries.data';

@Injectable()
export class QuerySeeder {
  constructor(
    @InjectRepository(Query)
    private queryRepository: Repository<Query>,
  ) {}

  async seed() {
    for (const queryData of MOCKED_QUERIES) {
      const query = this.queryRepository.create({
        ...queryData,
        selectedAttributes: queryData.selectedAttributes
      });
      await this.queryRepository.save(query);
      console.log(`Seeded query: ${query.name}`);
    }
  }
}
