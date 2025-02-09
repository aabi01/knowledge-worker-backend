import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Api } from './api.entity';

@Entity()
export class ApiParameter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  required: boolean;

  @Column({ nullable: true })
  defaultValue?: string;

  @ManyToOne(() => Api, api => api.parameters, { onDelete: 'CASCADE' })
  api: Api;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
