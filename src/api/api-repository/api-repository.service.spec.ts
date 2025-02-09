import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiRepositoryService } from './api-repository.service';
import { Api } from './entities/api.entity';
import { NotFoundException } from '@nestjs/common';

describe('ApiRepositoryService', () => {
  let service: ApiRepositoryService;
  let repository: Repository<Api>;

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

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
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
    it('should return an array of APIs', async () => {
      const expectedApis = [mockApi];
      mockRepository.find.mockResolvedValue(expectedApis);

      const result = await service.findAll();

      expect(result).toBe(expectedApis);
      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['parameters'],
      });
    });
  });

  describe('findById', () => {
    const validUuid = '550e8400-e29b-41d4-a716-446655440000';

    it('should return an API when it exists', async () => {
      mockRepository.findOne.mockResolvedValue(mockApi);

      const result = await service.findById(validUuid);

      expect(result).toBe(mockApi);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: validUuid },
        relations: ['parameters'],
      });
    });

    it('should throw NotFoundException when API does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findById(validUuid))
        .rejects
        .toThrow(new NotFoundException(`API with ID "${validUuid}" not found`));

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: validUuid },
        relations: ['parameters'],
      });
    });
  });
});
