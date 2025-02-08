import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Api } from '../../api/api-repository/entities/api.entity';
import { ApiParameter } from '../../api/api-repository/entities/api-parameter.entity';

@Injectable()
export class ApiRepositorySeeder {
  constructor(
    @InjectRepository(Api)
    private apiRepository: Repository<Api>,
  ) {}

  async seed() {
    const apis = [
      {
        id: 'movie-api',
        name: 'Movie API',
        description: 'API for managing movie data',
        endpoint: '/api/movies',
        parameters: [
          {
            name: 'title',
            description: 'Movie title',
            required: true,
          },
          {
            name: 'genre',
            description: 'Movie genre',
            required: true,
          },
        ],
        availableAttributes: [
          'title',
          'director',
          'genre',
          'releaseDate',
          'rating',
          'duration',
        ],
      },
    ];

    for (const apiData of apis) {
      // Create the main API entity
      const api = this.apiRepository.create({
        id: apiData.id,
        name: apiData.name,
        description: apiData.description,
        endpoint: apiData.endpoint,
        availableAttributes: apiData.availableAttributes,
      });

      // Save the API first
      const savedApi = await this.apiRepository.save(api);

      // Create and associate parameters
      const parameters = apiData.parameters.map(param => {
        const apiParam = new ApiParameter();
        apiParam.name = param.name;
        apiParam.description = param.description;
        apiParam.required = param.required;
        apiParam.api = savedApi;
        return apiParam;
      });

      // Update API with parameters
      savedApi.parameters = parameters;
      await this.apiRepository.save(savedApi);

      console.log(`Seeded API: ${savedApi.name}`);
    }
  }
}
