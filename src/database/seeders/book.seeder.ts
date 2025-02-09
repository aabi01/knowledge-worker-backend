import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import { Book } from '../../api/books/entities/book.entity';
import { MOCKED_BOOKS } from './seed-data/books.data';

@Injectable()
export class BookSeeder {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async seed(queryRunner?: QueryRunner) {
    const repository = queryRunner ? queryRunner.manager.getRepository(Book) : this.bookRepository;

    for (const bookData of MOCKED_BOOKS) {
      const book = repository.create(bookData);
      await repository.save(book);
      console.log(`Seeded book: ${book.title}`);
    }
  }
}
