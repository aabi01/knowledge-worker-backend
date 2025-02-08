import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Query } from '../../api/queries/entities/query.entity';
import { QueryParameter } from '../../api/queries/entities/query-parameter.entity';
import { Book } from '../../api/books/entities/book.entity';
import { Movie } from '../../api/movies/entities/movie.entity';
import { QuerySeeder } from './query.seeder';
import { BookSeeder } from './book.seeder';
import { MovieSeeder } from './movie.seeder';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Query, QueryParameter, Book, Movie]),
  ],
  providers: [QuerySeeder, BookSeeder, MovieSeeder, SeederService],
  exports: [SeederService],
})
export class SeederModule {}
