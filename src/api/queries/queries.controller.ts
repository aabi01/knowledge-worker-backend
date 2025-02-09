import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { QueriesService } from './queries.service';
import { CreateQueryDto } from './dto/create-query.dto';
import { Query } from './entities/query.entity';

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
}
