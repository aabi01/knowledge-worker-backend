export const MOCKED_QUERIES = [
  {
    id: '550e8400-e29b-41d4-a716-446655440010',
    name: 'Books from Morgan',
    apiId: '550e8400-e29b-41d4-a716-446655440000', // books-api UUID
    interval: 60000, // 1 minute
    parameters: [{ name: 'author', value: 'Morgan Housel' }],
    selectedAttributes: ['title', 'author', 'genre', 'price'],
    isActive: true,
    lastExecuted: new Date('2025-02-02T22:30:00Z'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440011',
    name: 'Science Fiction books',
    apiId: '550e8400-e29b-41d4-a716-446655440000', // books-api UUID
    interval: 300000, // 5 minutes
    parameters: [{ name: 'genre', value: 'Science Fiction' }],
    selectedAttributes: ['title', 'author', 'genre', 'price', 'publishDate'],
    isActive: true,
    lastExecuted: new Date('2025-02-02T20:00:00Z'),
  },
];
