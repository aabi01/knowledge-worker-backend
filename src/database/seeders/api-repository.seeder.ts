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
        id: 'books-api',
        name: 'Books API',
        endpoint: '/api/books',
        description: 'Query books by various parameters',
        parameters: [
          {
            name: 'author',
            description: 'Author name',
            required: true,
          },
          {
            name: 'genre',
            description: 'Book genre',
            required: true,
          },
          {
            name: 'year',
            description: 'Publication year',
            required: false,
          },
        ],
        availableAttributes: [
          'title',
          'author',
          'genre',
          'price',
          'availability',
          'rating',
          'publishDate',
        ],
      },
      {
        id: 'movies-api',
        name: 'Movies API',
        endpoint: '/api/movies',
        description: 'Query movies and their details',
        parameters: [
          {
            name: 'title',
            description: 'Movie title',
            required: false,
          },
          {
            name: 'director',
            description: 'Movie director',
            required: false,
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
      const parameters = apiData.parameters.map((param) => {
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
