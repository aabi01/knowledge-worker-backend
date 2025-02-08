import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Query } from './query.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class QueryParameter {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  value: string;

  @ManyToOne(() => Query, query => query.parameters, { onDelete: 'CASCADE' })
  query: Query;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
