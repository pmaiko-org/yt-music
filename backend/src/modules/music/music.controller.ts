import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
// import { RequestService } from '../../common/request/request.service';
import { GoogleDriveService } from '../../common/services/google-drive/google-drive.service';
import { YtMusicService } from './services/yt-music.service';
import { YtPlaylistQueryDto } from './dto/yt-playlist.query.dto';
import { MusicService } from './services/music.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { MusicListQueryDto } from './dto/music-list.query.dto';

@Controller('music')
export class MusicController {
  constructor(
    private readonly googleDriveService: GoogleDriveService,
    private readonly ytService: YtMusicService,
    private readonly musicService: MusicService,
  ) {}

  @Get('yt-playlist')
  async getYtPlaylist(@Query() query: YtPlaylistQueryDto) {
    const data = await this.ytService.getPlaylist(query);
    await this.musicService.createMusic();
    return data;
  }

  @Get('list')
  async getMusicList(@Query() query: MusicListQueryDto) {
    const data = await this.musicService.getMusicList(query);
    return data;
  }

  @Delete(':id')
  async deleteMusic(@Param('id') id: string) {
    return await this.musicService.deleteMusic(id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 50 * 1024 * 1024 }, // 50M
    }),
  )
  async uploadMusic(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return await this.musicService.uploadMusic(file);
  }

  @Get('uploads/:id')
  async getMusicById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const data = await this.musicService.getStreamByGDriveId(id);
      if (!data) {
        throw new Error('Stream not found');
      }

      const encodedName = encodeURIComponent(data.filename);

      const headers: Record<string, any> = {
        'Content-Type': data.mimeType,
        'Content-Length': data.size,
        'Content-Disposition': `inline; filename*=UTF-8''${encodedName}`,
        'X-Content-Type-Options': 'nosniff',
      };

      if (data.isAudio) {
        headers['Accept-Ranges'] = 'bytes';
        headers['Cache-Control'] = 'no-cache';
      } else {
        headers['Cache-Control'] = 'public, max-age=31536000, immutable';
      }

      res.set(headers);

      data.stream.pipe(res);
    } catch (error: unknown) {
      throw new NotFoundException('Stream not found', {
        cause: error,
      });
    }
  }
}
