import { Controller, Get, Query } from '@nestjs/common';
// import { RequestService } from '../../common/request/request.service';
import { YtMusicService } from './services/yt-music.service';
import { GoogleMusicQueryDto } from './dto/google.music.query.dto';
import { MusicService } from './services/music.service';

@Controller('music')
export class MusicController {
  constructor(
    private readonly ytService: YtMusicService,
    private readonly musicService: MusicService,
  ) {}
  @Get()
  async getMusic(@Query() query: GoogleMusicQueryDto) {
    const data = await this.ytService.getPlaylistItems(query);
    await this.musicService.createMusic();
    return data;
    // return new ResponseDto(data);
  }
}
