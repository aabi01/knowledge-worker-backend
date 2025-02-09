import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Api } from '../api/api-repository/entities/api.entity';
import { ApiParameter } from '../api/api-repository/entities/api-parameter.entity';
import { Book } from '../api/books/entities/book.entity';
import { Movie } from '../api/movies/entities/movie.entity';
import { Query } from '../api/queries/entities/query.entity';
import { QueryParameter } from '../api/queries/entities/query-parameter.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'knowledge_worker',
  entities: [Api, ApiParameter, Book, Movie, Query, QueryParameter],
  synchronize: false, // Disable auto-synchronization
  logging: process.env.NODE_ENV !== 'production',
};
