import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueriesController } from './queries.controller';
import { QueriesService } from './queries.service';
import { Query } from './entities/query.entity';
import { QueryParameter } from './entities/query-parameter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Query, QueryParameter])],
  controllers: [QueriesController],
  providers: [QueriesService],
  exports: [QueriesService],
})
export class QueriesModule {}
