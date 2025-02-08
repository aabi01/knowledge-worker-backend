import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  director: string;

  @Column()
  genre: string;

  @Column()
  releaseDate: string;

  @Column('decimal', { precision: 2, scale: 1 })
  rating: number;

  @Column()
  duration: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
