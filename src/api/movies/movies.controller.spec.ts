import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  const mockMoviesService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: mockMoviesService,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      mockMoviesService.findAll.mockResolvedValue(expectedMovies);

      const result = await controller.findAll();

      expect(result).toBe(expectedMovies);
      expect(mockMoviesService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should handle errors from the service', async () => {
      const error = new Error('Failed to fetch movies');
      mockMoviesService.findAll.mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow(error);
      expect(mockMoviesService.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
