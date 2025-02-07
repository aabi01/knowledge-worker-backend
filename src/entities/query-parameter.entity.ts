import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Query } from './query.entity';

@Entity()
export class QueryParameter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  value: string;

  @ManyToOne(() => Query, query => query.parameters, { onDelete: 'CASCADE' })
  query: Query;
}
