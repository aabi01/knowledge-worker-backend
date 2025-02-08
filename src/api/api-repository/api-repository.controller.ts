import { Controller, Get, Query } from '@nestjs/common';
import { ApiRepositoryService } from './api-repository.service';
import { Api } from './entities/api.entity';

@Controller('api-repository')
export class ApiRepositoryController {
  constructor(private readonly apiRepositoryService: ApiRepositoryService) {}

  @Get()
  findAll(): Promise<Api[]> {
    return this.apiRepositoryService.findAll();
  }

  @Get('by-ids')
  findAllById(@Query('ids') ids: string[]): Promise<Api[]> {
    return this.apiRepositoryService.findAllById(ids);
  }
}
