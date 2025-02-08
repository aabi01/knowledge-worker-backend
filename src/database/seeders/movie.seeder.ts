import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../../api/movies/entities/movie.entity';
import { MOCKED_MOVIES } from './seed-data/movies.data';

@Injectable()
export class MovieSeeder {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async seed() {
    for (const movieData of MOCKED_MOVIES) {
      const movie = this.movieRepository.create(movieData);
      await this.movieRepository.save(movie);
      console.log(`Seeded movie: ${movie.title}`);
    }
  }
}
