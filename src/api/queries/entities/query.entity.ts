import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QueryParameter } from './query-parameter.entity';

@Entity()
export class Query {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  apiId: string;

  @Column()
  interval: number;

  @OneToMany(() => QueryParameter, (parameter) => parameter.query, {
    cascade: true,
    eager: true,
  })
  parameters: QueryParameter[];

  @Column('text', { array: true })
  selectedAttributes: string[];

  @Column()
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastExecuted: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
