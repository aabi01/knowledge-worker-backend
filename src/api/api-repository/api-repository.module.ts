import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiRepositoryController } from './api-repository.controller';
import { ApiRepositoryService } from './api-repository.service';
import { Api } from './entities/api.entity';
import { ApiParameter } from './entities/api-parameter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Api, ApiParameter])],
  controllers: [ApiRepositoryController],
  providers: [ApiRepositoryService],
  exports: [ApiRepositoryService],
})
export class ApiRepositoryModule {}
