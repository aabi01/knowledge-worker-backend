import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Api } from './entities/api.entity';

@Injectable()
export class ApiRepositoryService {
  constructor(
    @InjectRepository(Api)
    private apiRepository: Repository<Api>,
  ) {}

  findAll(): Promise<Api[]> {
    return this.apiRepository.find({
      relations: ['parameters'],
    });
  }

  async findById(id: string): Promise<Api> {
    const api = await this.apiRepository.findOne({
      where: { id },
      relations: ['parameters'],
    });

    if (!api) {
      throw new NotFoundException(`API with ID "${id}" not found`);
    }

    return api;
  }
}
