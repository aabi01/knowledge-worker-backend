import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const mockBooksService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const expectedBooks: Book[] = [
        {
          id: '1',
          title: 'Book 1',
          author: 'Author 1',
          genre: 'Fiction',
          price: 29.99,
          availability: true,
          rating: 4.5,
          publishDate: '2024-01-01',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Book 2',
          author: 'Author 2',
          genre: 'Non-Fiction',
          price: 19.99,
          availability: true,
          rating: 4.0,
          publishDate: '2024-02-01',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockBooksService.findAll.mockResolvedValue(expectedBooks);

      const result = await controller.findAll();

      expect(result).toBe(expectedBooks);
      expect(mockBooksService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should handle errors from the service', async () => {
      const error = new Error('Failed to fetch books');
      mockBooksService.findAll.mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow(error);
      expect(mockBooksService.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
