export const MOCKED_APIS = [
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
