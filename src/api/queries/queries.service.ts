import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Query } from './entities/query.entity';
import { CreateQueryDto } from './dto/create-query.dto';

@Injectable()
export class QueriesService {
  constructor(
    @InjectRepository(Query)
    private queriesRepository: Repository<Query>,
  ) {}

  async findAll(): Promise<Query[]> {
    return this.queriesRepository.find();
  }

  async findOne(id: string): Promise<Query> {
    const query = await this.queriesRepository.findOneBy({ id });
    if (!query) {
      throw new NotFoundException(`Query with ID "${id}" not found`);
    }
    return query;
  }

  async create(createQueryDto: CreateQueryDto): Promise<Query> {
    const query = this.queriesRepository.create(createQueryDto);
    return this.queriesRepository.save(query);
  }

  async update(
    id: string,
    updateData: Partial<CreateQueryDto>,
  ): Promise<Query> {
    const query = await this.findOne(id);
    Object.assign(query, updateData);
    return this.queriesRepository.save(query);
  }

  async remove(id: string): Promise<void> {
    const query = await this.findOne(id);
    await this.queriesRepository.remove(query);
  }
}
