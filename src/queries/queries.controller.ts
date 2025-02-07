import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { QueriesService } from './queries.service';
import { Query } from '../entities/query.entity';
import { CreateQueryDto } from './dto/create-query.dto';

@Controller('queries')
export class QueriesController {
  constructor(private readonly queriesService: QueriesService) {}

  @Get()
  findAll(): Promise<Query[]> {
    return this.queriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Query> {
    return this.queriesService.findOne(id);
  }

  @Post()
  create(@Body() createQueryDto: CreateQueryDto): Promise<Query> {
    return this.queriesService.create(createQueryDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateQueryDto: Partial<CreateQueryDto>,
  ): Promise<Query> {
    return this.queriesService.update(id, updateQueryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.queriesService.remove(id);
  }

  @Patch(':id/toggle-active')
  toggleActive(@Param('id') id: string): Promise<Query> {
    return this.queriesService.toggleActive(id);
  }

  @Patch(':id/executed')
  updateLastExecuted(@Param('id') id: string): Promise<Query> {
    return this.queriesService.updateLastExecuted(id);
  }
}
