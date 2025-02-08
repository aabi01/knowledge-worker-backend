import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../../api/books/entities/book.entity';
import { MOCKED_BOOKS } from './seed-data/books.data';

@Injectable()
export class BookSeeder {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async seed() {
    for (const bookData of MOCKED_BOOKS) {
      const book = this.bookRepository.create(bookData);
      await this.bookRepository.save(book);
      console.log(`Seeded book: ${book.title}`);
    }
  }
}
