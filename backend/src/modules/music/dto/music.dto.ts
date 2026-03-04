import { MusicEntity } from '../music.entity';

export class MusicDto {
  id: string;
  resource_id: string;
  filename: string;
  original_name: string;
  mimetype: string;
  size: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  bitrate: number;
  sample_rate: number;
  channels: number;
  codec: string;
  container: string;
  is_lossless: boolean;

  constructor(entity: MusicEntity) {
    this.id = entity.id;
    this.resource_id = entity.resource_id;
    this.filename = entity.filename;
    this.original_name = entity.original_name;
    this.mimetype = entity.mimetype;
    this.size = entity.size;
    this.title = entity.title;
    this.artist = entity.artist;
    this.album = entity.album;
    this.duration = entity.duration;
    this.bitrate = entity.bitrate;
    this.sample_rate = entity.sample_rate;
    this.channels = entity.channels;
    this.codec = entity.codec;
    this.container = entity.container;
    this.is_lossless = entity.is_lossless;
  }
}
