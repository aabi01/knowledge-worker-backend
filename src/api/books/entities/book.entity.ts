import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  genre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  availability: boolean;

  @Column('decimal', { precision: 3, scale: 1 })
  rating: number;

  @Column()
  publishDate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
