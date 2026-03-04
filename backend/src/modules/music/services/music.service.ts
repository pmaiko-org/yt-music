import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  parseBuffer,
  selectCover,
  getSupportedMimeTypes,
  IAudioMetadata,
} from 'music-metadata';
import { ConfigService } from '@nestjs/config';
import { EntityManager, Repository } from 'typeorm';
import { MusicEntity } from '../music.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleDriveService } from '../../../common/services/google-drive/google-drive.service';
import { ImageOptimizerService } from '../../../common/services/image-optimizer/image-optimizer.service';
import { HelperService } from '../../../common/services/helper/helper.service';
import { MusicDto } from '../dto/music.dto';
import { BaseService } from '../../../common/base.service';
import { MusicListQueryDto } from '../dto/music-list.query.dto';
import { MusicListResponseDto } from '../dto/music-list.response.dto'

@Injectable()
export class MusicService {
  constructor(
    private readonly configService: ConfigService,
    private readonly helperService: HelperService,
    private readonly googleDriveService: GoogleDriveService,
    private readonly imageOptimizerService: ImageOptimizerService,
    private readonly entityManager: EntityManager,
    @InjectRepository(MusicEntity)
    private readonly musicRepository: Repository<MusicEntity>,
  ) {
    configService.get('BASE_URL');
  }

  async createMusic() {
    // await this.entityManager.save(new MusicEntity());
    // await this.musicRepository.save(new MusicEntity());
    console.log(await this.musicRepository.find());
  }

  async getMusicList(query: MusicListQueryDto): Promise<MusicListResponseDto> {
    const tempService = new BaseService<MusicEntity, MusicDto>(
      this.musicRepository,
      MusicDto,
    );

    return tempService.paginate(query);
  }

  async getStreamByGDriveId(id: string) {
    const file = await this.googleDriveService.getFileById(id);
    return this.googleDriveService.getStream(file);
  }

  async deleteMusic(id: string) {
    const music = await this.musicRepository.findOne({
      where: {
        id,
      },
    });

    if (!music) {
      throw new BadRequestException('Music not found');
    }

    try {
      const gDriveMusicId = music.g_drive_music_id;
      const gDriveCoverId = music.g_drive_cover_id;
      const gDriveWebpId = music.g_drive_webp_id;

      await Promise.allSettled([
        gDriveMusicId && this.googleDriveService.deleteFile(gDriveMusicId),
        gDriveCoverId && this.googleDriveService.deleteFile(gDriveCoverId),
        gDriveWebpId && this.googleDriveService.deleteFile(gDriveWebpId),
      ]);
    } catch {
      throw new BadRequestException('Failed to delete files from Google Drive');
    }

    await this.musicRepository.delete({ id });
  }

  async uploadMusic(file: Express.Multer.File): Promise<MusicEntity> {
    this.validateMimeType(file.mimetype);

    const resourceId = uuidv4();
    const metadata = await parseBuffer(file.buffer);

    const covers = await this.processCoverImages(metadata);

    const uploadResults = await this.uploadAllToDrive(file, resourceId, covers);

    try {
      const musicEntity = this.musicRepository.create({
        ...this.mapMetadataToEntity(metadata, file),
        resource_id: resourceId,
        g_drive_music_id: uploadResults.musicId,
        g_drive_cover_id: uploadResults.coverId,
        g_drive_webp_id: uploadResults.webpId,
      });

      return await this.musicRepository.save(musicEntity);
    } catch (error) {
      throw new InternalServerErrorException('Failed to save music record', {
        cause: error,
      });
    }
  }

  private validateMimeType(mimetype: string) {
    if (!getSupportedMimeTypes().includes(mimetype)) {
      throw new BadRequestException('File type is not supported.');
    }
  }

  private async processCoverImages(metadata: IAudioMetadata) {
    const picture = selectCover(metadata.common.picture);
    if (!picture) return null;

    const originalBuffer = Buffer.from(picture.data);
    const webpBuffer = await this.imageOptimizerService.toWebp(originalBuffer);

    return {
      original: { buffer: originalBuffer, mime: picture.format },
      webp: { buffer: webpBuffer, mime: this.helperService.getMimeTypeWebp() },
    };
  }

  private async uploadAllToDrive(
    file: Express.Multer.File,
    resourceId: string,
    covers: Awaited<ReturnType<typeof this.processCoverImages>>,
  ) {
    const musicTask = this.googleDriveService.uploadFile(
      file.buffer,
      resourceId,
      file.mimetype,
      {
        filename: file.filename || file.originalname,
        isAudio: 'true',
      },
    );

    const coverTask = covers
      ? this.googleDriveService.uploadFile(
          covers.original.buffer,
          resourceId,
          covers.original.mime,
        )
      : Promise.resolve(null);

    const webpTask = covers
      ? this.googleDriveService.uploadFile(
          covers.webp.buffer,
          resourceId,
          covers.webp.mime,
        )
      : Promise.resolve(null);

    const [music, cover, webp] = await Promise.all([
      musicTask,
      coverTask,
      webpTask,
    ]);

    return {
      musicId: music?.id as string,
      coverId: cover?.id as string,
      webpId: webp?.id as string,
    };
  }

  private mapMetadataToEntity(
    metadata: IAudioMetadata,
    file: Express.Multer.File,
  ): Partial<MusicEntity> {
    const { common, format } = metadata;
    return {
      filename: file.filename ?? file.originalname,
      original_name: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      title: common.title ?? file.originalname,
      artist: common.artist ?? 'Unknown Artist',
      album: common.album ?? 'Unknown Album',
      duration: format.duration ?? 0,
      bitrate: format.bitrate ?? 0,
      sample_rate: format.sampleRate ?? 0,
      channels: format.numberOfChannels ?? 2,
      codec: format.codec ?? 'unknown',
      container: format.container ?? 'unknown',
      is_lossless: format.lossless ?? false,
    };
  }
}
