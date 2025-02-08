import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../../api/movies/entities/movie.entity';

@Injectable()
export class MovieSeeder {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async seed() {
    const movies = [
      {
        title: 'Inception',
        director: 'Christopher Nolan',
        genre: 'Science Fiction',
        releaseDate: '2010-07-16',
        rating: 8.8,
        duration: '2h 28min'
      },
      {
        title: 'The Shawshank Redemption',
        director: 'Frank Darabont',
        genre: 'Drama',
        releaseDate: '1994-09-23',
        rating: 9.3,
        duration: '2h 22min'
      },
      {
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        genre: 'Crime',
        releaseDate: '1994-10-14',
        rating: 8.9,
        duration: '2h 34min'
      },
      {
        title: 'The Dark Knight',
        director: 'Christopher Nolan',
        genre: 'Action',
        releaseDate: '2008-07-18',
        rating: 9.0,
        duration: '2h 32min'
      },
      {
        title: 'Goodfellas',
        director: 'Martin Scorsese',
        genre: 'Crime',
        releaseDate: '1990-09-19',
        rating: 8.7,
        duration: '2h 26min'
      }
    ];

    for (const movieData of movies) {
      const movie = this.movieRepository.create(movieData);
      await this.movieRepository.save(movie);
      console.log(`Seeded movie: ${movie.title}`);
    }
  }
}
