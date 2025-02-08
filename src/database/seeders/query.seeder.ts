import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Query } from '../../api/queries/entities/query.entity';

@Injectable()
export class QuerySeeder {
  constructor(
    @InjectRepository(Query)
    private queryRepository: Repository<Query>,
  ) {}

  async seed() {
    const dummyQueries = [
      {
        id: '1',
        name: 'Books from Morgan',
        apiId: 'books-api',
        interval: 60000, // 1 minute
        parameters: [{ name: 'author', value: 'Morgan Housel' }],
        selectedAttributes: ['title', 'author', 'genre', 'price'],
        isActive: true,
        lastExecuted: new Date('2025-02-02T22:30:00Z'),
      },
      {
        id: '2',
        name: 'Science Fiction books',
        apiId: 'books-api',
        interval: 300000, // 5 minutes
        parameters: [{ name: 'genre', value: 'Science Fiction' }],
        selectedAttributes: [
          'title',
          'author',
          'genre',
          'price',
          'publishDate',
        ],
        isActive: true,
        lastExecuted: new Date('2025-02-02T20:00:00Z'),
      },
    ];

    for (const queryData of dummyQueries) {
      const query = this.queryRepository.create(queryData);
      await this.queryRepository.save(query);
      console.log(`Seeded query: ${query.name}`);
    }
  }
}
