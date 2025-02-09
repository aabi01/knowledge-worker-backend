import { Test, TestingModule } from '@nestjs/testing';
import { QueriesController } from './queries.controller';
import { QueriesService } from './queries.service';
import { CreateQueryDto } from './dto/create-query.dto';
import { Query } from './entities/query.entity';

describe('QueriesController', () => {
  let controller: QueriesController;
  let service: QueriesService;

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

  const mockQueriesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueriesController],
      providers: [
        {
          provide: QueriesService,
          useValue: mockQueriesService,
        },
      ],
    }).compile();

    controller = module.get<QueriesController>(QueriesController);
    service = module.get<QueriesService>(QueriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of queries', async () => {
      mockQueriesService.findAll.mockResolvedValue([mockQuery]);
      const result = await controller.findAll();
      expect(result).toEqual([mockQuery]);
      expect(mockQueriesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single query', async () => {
      mockQueriesService.findOne.mockResolvedValue(mockQuery);
      const result = await controller.findOne('123');
      expect(result).toEqual(mockQuery);
      expect(mockQueriesService.findOne).toHaveBeenCalledWith('123');
    });
  });

  describe('create', () => {
    it('should create and return a query', async () => {
      mockQueriesService.create.mockResolvedValue(mockQuery);
      const result = await controller.create(mockCreateQueryDto);
      expect(result).toEqual(mockQuery);
      expect(mockQueriesService.create).toHaveBeenCalledWith(mockCreateQueryDto);
    });
  });

  describe('update', () => {
    it('should update and return a query', async () => {
      const updateDto = { name: 'Updated Query' };
      const updatedQuery = { ...mockQuery, ...updateDto };
      mockQueriesService.update.mockResolvedValue(updatedQuery);

      const result = await controller.update('123', updateDto);
      expect(result).toEqual(updatedQuery);
      expect(mockQueriesService.update).toHaveBeenCalledWith('123', updateDto);
    });
  });

  describe('remove', () => {
    it('should remove a query', async () => {
      mockQueriesService.remove.mockResolvedValue(undefined);
      await controller.remove('123');
      expect(mockQueriesService.remove).toHaveBeenCalledWith('123');
    });
  });
});
