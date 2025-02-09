import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ApiRepositoryService } from './api-repository.service';
import { Api } from './entities/api.entity';
import { ApiParameter } from './entities/api-parameter.entity';

describe('ApiRepositoryService', () => {
  let service: ApiRepositoryService;
  let repository: Repository<Api>;

  const mockApi: Api = {
    id: 'api-1',
    name: 'Weather API',
    endpoint: '/api/weather',
    description: 'Get weather information',
    parameters: [],
    availableAttributes: ['temperature', 'humidity'],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockApiParameter: ApiParameter = {
    id: 'param-1',
    name: 'apiKey',
    description: 'API Key for authentication',
    required: true,
    defaultValue: undefined,
    api: mockApi,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Update the mockApi to include the parameter
  mockApi.parameters = [mockApiParameter];

  const mockRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiRepositoryService,
        {
          provide: getRepositoryToken(Api),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ApiRepositoryService>(ApiRepositoryService);
    repository = module.get<Repository<Api>>(getRepositoryToken(Api));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of APIs with their parameters', async () => {
      const expectedApis = [mockApi];
      mockRepository.find.mockResolvedValue(expectedApis);

      const result = await service.findAll();

      expect(result).toEqual(expectedApis);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['parameters']
      });
    });

    it('should handle errors when finding APIs', async () => {
      const error = new Error('Database connection failed');
      mockRepository.find.mockRejectedValue(error);

      await expect(service.findAll()).rejects.toThrow(error);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAllById', () => {
    it('should return APIs matching the provided IDs', async () => {
      const ids = ['api-1', 'api-2'];
      const expectedApis = [mockApi];
      mockRepository.find.mockResolvedValue(expectedApis);

      const result = await service.findAllById(ids);

      expect(result).toEqual(expectedApis);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: {
          id: In(ids)
        },
        relations: ['parameters']
      });
    });

    it('should handle errors when finding APIs by IDs', async () => {
      const ids = ['api-1', 'api-2'];
      const error = new Error('Database connection failed');
      mockRepository.find.mockRejectedValue(error);

      await expect(service.findAllById(ids)).rejects.toThrow(error);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no matching IDs found', async () => {
      const ids = ['non-existent-id'];
      mockRepository.find.mockResolvedValue([]);

      const result = await service.findAllById(ids);

      expect(result).toEqual([]);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });
});
