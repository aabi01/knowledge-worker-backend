import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Query } from '../../api/queries/entities/query.entity';
import { QueryParameter } from '../../api/queries/entities/query-parameter.entity';
import { Book } from '../../api/books/entities/book.entity';
import { QuerySeeder } from './query.seeder';
import { BookSeeder } from './book.seeder';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Query, QueryParameter, Book]),
  ],
  providers: [QuerySeeder, BookSeeder, SeederService],
  exports: [SeederService],
})
export class SeederModule {}
