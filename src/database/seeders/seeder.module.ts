import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Query } from '../../api/queries/entities/query.entity';
import { QueryParameter } from '../../api/queries/entities/query-parameter.entity';
import { Book } from '../../api/books/entities/book.entity';
import { Movie } from '../../api/movies/entities/movie.entity';
import { Api } from '../../api/api-repository/entities/api.entity';
import { ApiParameter } from '../../api/api-repository/entities/api-parameter.entity';
import { QuerySeeder } from './query.seeder';
import { BookSeeder } from './book.seeder';
import { MovieSeeder } from './movie.seeder';
import { ApiRepositorySeeder } from './api-repository.seeder';
import { SeederService } from './seeder.service';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from '../../config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Query, QueryParameter, Book, Movie, Api, ApiParameter]),
  ],
  providers: [QuerySeeder, BookSeeder, MovieSeeder, ApiRepositorySeeder, SeederService],
  exports: [SeederService],
})
export class SeederModule {}
