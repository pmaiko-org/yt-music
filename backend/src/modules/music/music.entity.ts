import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';

@Entity('music')
export class MusicEntity extends AbstractEntity<MusicEntity> {
  @Column({ type: 'uuid', unique: true })
  resource_id: string;

  @Column({ type: 'varchar', length: 255 })
  filename: string;

  @Column({ type: 'varchar', length: 255 })
  original_name: string;

  @Column({ type: 'varchar', length: 255 })
  mimetype: string;

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  artist: string;

  @Column({ type: 'varchar', length: 255 })
  album: string;

  @Column({ type: 'numeric' })
  duration: number;

  @Column({ type: 'int' })
  bitrate: number;

  @Column({ type: 'int' })
  sample_rate: number;

  @Column({ type: 'int' })
  channels: number;

  @Column({ type: 'varchar', length: 255 })
  codec: string;

  @Column({ type: 'varchar', length: 255 })
  container: string;

  @Column({ type: 'boolean' })
  is_lossless: boolean;

  @Column({ type: 'varchar', length: 255 })
  g_drive_music_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  g_drive_cover_id?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  g_drive_webp_id?: string;
}
