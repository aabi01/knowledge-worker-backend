import { Injectable } from '@nestjs/common';
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
      relations: ['parameters']
    });
  }

  findAllById(ids: string[]): Promise<Api[]> {
    return this.apiRepository.find({
      where: {
        id: In(ids)
      },
      relations: ['parameters']
    });
  }
}
