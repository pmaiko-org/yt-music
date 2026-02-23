import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';

@Entity('music')
export class MusicEntity extends AbstractEntity {
  @Column({ type: 'text', nullable: true })
  testimonial: string;
}
