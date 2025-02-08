import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Query } from '../../entities/query.entity';
import { QueryParameter } from '../../entities/query-parameter.entity';
import { QuerySeeder } from './query.seeder';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Query, QueryParameter]),
  ],
  providers: [QuerySeeder, SeederService],
  exports: [SeederService],
})
export class SeederModule {}
