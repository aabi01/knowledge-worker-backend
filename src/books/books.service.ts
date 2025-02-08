import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  private readonly books: Book[] = [
    {
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      genre: 'Finance',
      price: 29.99,
      availability: true,
      rating: 4.8,
      publishDate: '2020-09-08'
    },
    {
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      genre: 'Science Fiction',
      price: 24.99,
      availability: true,
      rating: 4.9,
      publishDate: '2021-05-04'
    },
    {
      title: 'Dune',
      author: 'Frank Herbert',
      genre: 'Science Fiction',
      price: 19.99,
      availability: true,
      rating: 4.7,
      publishDate: '1965-08-01'
    },
    {
      title: '100 Years of Solitude',
      author: 'Gabriel García Márquez',
      genre: 'Literary Fiction',
      price: 21.99,
      availability: false,
      rating: 4.6,
      publishDate: '1967-05-30'
    },
    {
      title: 'The Intelligent Investor',
      author: 'Benjamin Graham',
      genre: 'Finance',
      price: 34.99,
      availability: true,
      rating: 4.7,
      publishDate: '1949-01-01'
    }
  ];

  findAll(): Book[] {
    return this.books;
  }
}
