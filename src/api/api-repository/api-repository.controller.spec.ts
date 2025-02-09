import { Test, TestingModule } from '@nestjs/testing';
import { ApiRepositoryController } from './api-repository.controller';
import { ApiRepositoryService } from './api-repository.service';
import { Api } from './entities/api.entity';
import { ApiParameter } from './entities/api-parameter.entity';

describe('ApiRepositoryController', () => {
  let controller: ApiRepositoryController;
  let service: ApiRepositoryService;

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

  const mockApiRepositoryService = {
    findAll: jest.fn(),
    findAllById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiRepositoryController],
      providers: [
        {
          provide: ApiRepositoryService,
          useValue: mockApiRepositoryService,
        },
      ],
    }).compile();

    controller = module.get<ApiRepositoryController>(ApiRepositoryController);
    service = module.get<ApiRepositoryService>(ApiRepositoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of APIs', async () => {
      const expectedApis = [mockApi];
      mockApiRepositoryService.findAll.mockResolvedValue(expectedApis);

      const result = await controller.findAll();

      expect(result).toBe(expectedApis);
      expect(mockApiRepositoryService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should handle errors from the service', async () => {
      const error = new Error('Failed to fetch APIs');
      mockApiRepositoryService.findAll.mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow(error);
      expect(mockApiRepositoryService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAllById', () => {
    it('should return APIs matching the provided IDs', async () => {
      const ids = ['api-1', 'api-2'];
      const expectedApis = [mockApi];
      mockApiRepositoryService.findAllById.mockResolvedValue(expectedApis);

      const result = await controller.findAllById(ids);

      expect(result).toBe(expectedApis);
      expect(mockApiRepositoryService.findAllById).toHaveBeenCalledTimes(1);
      expect(mockApiRepositoryService.findAllById).toHaveBeenCalledWith(ids);
    });

    it('should handle errors from the service when finding by IDs', async () => {
      const ids = ['api-1', 'api-2'];
      const error = new Error('Failed to fetch APIs by IDs');
      mockApiRepositoryService.findAllById.mockRejectedValue(error);

      await expect(controller.findAllById(ids)).rejects.toThrow(error);
      expect(mockApiRepositoryService.findAllById).toHaveBeenCalledTimes(1);
    });

    it('should handle empty ID array', async () => {
      const ids = [];
      const expectedApis = [];
      mockApiRepositoryService.findAllById.mockResolvedValue(expectedApis);

      const result = await controller.findAllById(ids);

      expect(result).toEqual(expectedApis);
      expect(mockApiRepositoryService.findAllById).toHaveBeenCalledTimes(1);
      expect(mockApiRepositoryService.findAllById).toHaveBeenCalledWith(ids);
    });
  });
});
