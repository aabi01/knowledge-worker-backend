import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiParameter } from './api-parameter.entity';

@Entity()
export class Api {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  endpoint: string;

  @Column()
  description: string;

  @OneToMany(() => ApiParameter, (parameter) => parameter.api, {
    cascade: true,
    eager: true,
  })
  parameters: ApiParameter[];

  @Column('text', { array: true })
  availableAttributes: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
