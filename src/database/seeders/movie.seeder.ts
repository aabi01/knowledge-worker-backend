import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import { Movie } from '../../api/movies/entities/movie.entity';
import { MOCKED_MOVIES } from './seed-data/movies.data';

@Injectable()
export class MovieSeeder {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async seed(queryRunner?: QueryRunner) {
    const repository = queryRunner ? queryRunner.manager.getRepository(Movie) : this.movieRepository;

    for (const movieData of MOCKED_MOVIES) {
      const movie = repository.create(movieData);
      await repository.save(movie);
      console.log(`Seeded movie: ${movie.title}`);
    }
  }
}
