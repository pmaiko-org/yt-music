import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EntityManager, Repository } from 'typeorm';
import { MusicEntity } from '../music.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MusicService {
  constructor(
    private configService: ConfigService,
    private readonly entityManager: EntityManager,
    @InjectRepository(MusicEntity)
    private readonly musicRepository: Repository<MusicEntity>,
  ) {
    configService.get('BASE_URL');
  }

  async createMusic() {
    await this.entityManager.save(new MusicEntity());
    await this.musicRepository.save(new MusicEntity());

    console.log(await this.musicRepository.find());
  }
}
