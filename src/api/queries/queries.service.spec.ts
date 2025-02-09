import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueriesService } from './queries.service';
import { Query } from './entities/query.entity';
import { CreateQueryDto } from './dto/create-query.dto';
import { NotFoundException } from '@nestjs/common';

describe('QueriesService', () => {
  let service: QueriesService;
  let repository: Repository<Query>;

  const mockQuery: Query = {
    id: '123',
    name: 'Test Query',
    apiId: 'api123',
    interval: 300,
    parameters: [],
    selectedAttributes: ['attr1', 'attr2'],
    isActive: true,
    lastExecuted: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCreateQueryDto: CreateQueryDto = {
    name: 'Test Query',
    apiId: 'api123',
    interval: 300,
    parameters: [],
    selectedAttributes: ['attr1', 'attr2'],
    isActive: true,
  };

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueriesService,
        {
          provide: getRepositoryToken(Query),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<QueriesService>(QueriesService);
    repository = module.get<Repository<Query>>(getRepositoryToken(Query));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of queries', async () => {
      mockRepository.find.mockResolvedValue([mockQuery]);
      const result = await service.findAll();
      expect(result).toEqual([mockQuery]);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single query', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockQuery);
      const result = await service.findOne('123');
      expect(result).toEqual(mockQuery);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: '123' });
    });

    it('should throw NotFoundException when query not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new query', async () => {
      mockRepository.create.mockReturnValue(mockQuery);
      mockRepository.save.mockResolvedValue(mockQuery);

      const result = await service.create(mockCreateQueryDto);
      expect(result).toEqual(mockQuery);
      expect(mockRepository.create).toHaveBeenCalledWith(mockCreateQueryDto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockQuery);
    });
  });

  describe('update', () => {
    it('should update and return the query', async () => {
      const updateDto = { name: 'Updated Query' };
      const updatedQuery = { ...mockQuery, ...updateDto };
      
      mockRepository.findOneBy.mockResolvedValue(mockQuery);
      mockRepository.save.mockResolvedValue(updatedQuery);

      const result = await service.update('123', updateDto);
      expect(result).toEqual(updatedQuery);
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when updating non-existent query', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);
      await expect(service.update('999', { name: 'Updated' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the query', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockQuery);
      mockRepository.remove.mockResolvedValue(undefined);

      await service.remove('123');
      expect(mockRepository.remove).toHaveBeenCalledWith(mockQuery);
    });

    it('should throw NotFoundException when removing non-existent query', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);
      await expect(service.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
