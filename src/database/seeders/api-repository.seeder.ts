import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import { Api } from '../../api/api-repository/entities/api.entity';
import { ApiParameter } from '../../api/api-repository/entities/api-parameter.entity';
import { MOCKED_APIS } from './seed-data/apis.data';

@Injectable()
export class ApiRepositorySeeder {
  constructor(
    @InjectRepository(Api)
    private apiRepository: Repository<Api>,
  ) {}

  async seed(queryRunner?: QueryRunner) {
    const repository = queryRunner
      ? queryRunner.manager.getRepository(Api)
      : this.apiRepository;
    const parameterRepository = queryRunner
      ? queryRunner.manager.getRepository(ApiParameter)
      : this.apiRepository.manager.getRepository(ApiParameter);

    for (const apiData of MOCKED_APIS) {
      // Create the main API entity
      const api = repository.create({
        id: apiData.id,
        name: apiData.name,
        description: apiData.description,
        endpoint: apiData.endpoint,
        availableAttributes: apiData.availableAttributes,
      });

      // Save the API first
      const savedApi = await repository.save(api);

      // Create and associate parameters
      const parameters = apiData.parameters.map((param) => {
        const apiParam = new ApiParameter();
        apiParam.name = param.name;
        apiParam.description = param.description;
        apiParam.required = param.required;
        apiParam.api = savedApi;
        return apiParam;
      });

      // Save all parameters
      await parameterRepository.save(parameters);
      console.log(
        `Seeded API: ${api.name} with ${parameters.length} parameters`,
      );
    }
  }
}
