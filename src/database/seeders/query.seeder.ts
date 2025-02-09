import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import { Query } from '../../api/queries/entities/query.entity';
import { MOCKED_QUERIES } from './seed-data/queries.data';

@Injectable()
export class QuerySeeder {
  constructor(
    @InjectRepository(Query)
    private queryRepository: Repository<Query>,
  ) {}

  async seed(queryRunner?: QueryRunner) {
    const repository = queryRunner ? queryRunner.manager.getRepository(Query) : this.queryRepository;

    for (const queryData of MOCKED_QUERIES) {
      const query = repository.create({
        ...queryData,
        selectedAttributes: queryData.selectedAttributes
      });
      await repository.save(query);
      console.log(`Seeded query: ${query.name}`);
    }
  }
}
