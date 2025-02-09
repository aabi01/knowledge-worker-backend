import { Test, TestingModule } from '@nestjs/testing';
import { ApiRepositoryController } from './api-repository.controller';
import { ApiRepositoryService } from './api-repository.service';
import { Api } from './entities/api.entity';
import { ApiParameter } from './entities/api-parameter.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ApiRepositoryController', () => {
  let controller: ApiRepositoryController;
  let service: ApiRepositoryService;

  const mockApi: Api = {
    id: '550e8400-e29b-41d4-a716-446655440000',
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
    findById: jest.fn(),
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
  });

  describe('findById', () => {
    const validUuid = '550e8400-e29b-41d4-a716-446655440000';
    const invalidUuid = 'not-a-uuid';

    it('should return an API when given a valid UUID', async () => {
      mockApiRepositoryService.findById.mockResolvedValue(mockApi);

      const result = await controller.findById(validUuid);

      expect(result).toBe(mockApi);
      expect(mockApiRepositoryService.findById).toHaveBeenCalledWith(validUuid);
      expect(mockApiRepositoryService.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException when given an invalid UUID', async () => {
      await expect(controller.findById(invalidUuid))
        .rejects
        .toThrow(BadRequestException);

      expect(mockApiRepositoryService.findById).not.toHaveBeenCalled();
    });

    it('should propagate NotFoundException from service', async () => {
      mockApiRepositoryService.findById.mockRejectedValue(
        new NotFoundException(`API with ID "${validUuid}" not found`)
      );

      await expect(controller.findById(validUuid))
        .rejects
        .toThrow(NotFoundException);

      expect(mockApiRepositoryService.findById).toHaveBeenCalledWith(validUuid);
      expect(mockApiRepositoryService.findById).toHaveBeenCalledTimes(1);
    });
  });
});
