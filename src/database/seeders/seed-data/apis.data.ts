export const MOCKED_APIS = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
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
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Movies API',
    endpoint: '/api/movies',
    description: 'Query movies and their details',
    parameters: [
      {
        name: 'title',
        description: 'Movie title',
        required: true,
      },
      {
        name: 'genre',
        description: 'Movie genre',
        required: false,
      },
      {
        name: 'year',
        description: 'Release year',
        required: false,
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
