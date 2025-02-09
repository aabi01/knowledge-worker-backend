import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

describe('MoviesService', () => {
  let service: MoviesService;
  let repository: Repository<Movie>;

  const mockRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const expectedMovies: Movie[] = [
        {
          id: '1',
          title: 'Inception',
          director: 'Christopher Nolan',
          genre: 'Sci-Fi',
          releaseDate: '2010-07-16',
          rating: 8.8,
          duration: '2h 28min',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'The Godfather',
          director: 'Francis Ford Coppola',
          genre: 'Crime',
          releaseDate: '1972-03-24',
          rating: 9.2,
          duration: '2h 55min',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockRepository.find.mockResolvedValue(expectedMovies);

      const result = await service.findAll();

      expect(result).toEqual(expectedMovies);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
      expect(mockRepository.find).toHaveBeenCalledWith();
    });

    it('should handle errors when finding movies', async () => {
      const error = new Error('Database connection failed');
      mockRepository.find.mockRejectedValue(error);

      await expect(service.findAll()).rejects.toThrow(error);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });
});
