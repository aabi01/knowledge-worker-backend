import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { ApiRepositoryService } from './api-repository.service';
import { Api } from './entities/api.entity';

@Controller('api-repository')
export class ApiRepositoryController {
  constructor(private readonly apiRepositoryService: ApiRepositoryService) {}

  @Get()
  findAll(): Promise<Api[]> {
    return this.apiRepositoryService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Api> {
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    try {
      return await this.apiRepositoryService.findById(id);
    } catch (error) {
      throw error;
    }
  }
}
