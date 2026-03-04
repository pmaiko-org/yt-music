import { Injectable } from '@nestjs/common';
import { google, youtube_v3 } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import { YtPlaylistQueryDto } from '../dto/yt-playlist.query.dto';
import { ytPlaylistResponseDto } from '../dto/yt-playlist.response.dto';
import { HelperService } from '../../../common/services/helper/helper.service';
import { Mp3wrParserService } from '../parsers/mp3wr-parser.service';

@Injectable()
export class YtMusicService {
  private youtube: youtube_v3.Youtube;

  constructor(
    private configService: ConfigService,
    private helperService: HelperService,
    private mp3wrParserService: Mp3wrParserService,
  ) {
    this.youtube = google.youtube({
      version: 'v3',
      auth: this.configService.get('googleApiKey') as string,
    });
  }

  async getPlaylist(query: YtPlaylistQueryDto) {
    const response = await this.youtube.playlistItems.list({
      part: ['id', 'snippet'],
      playlistId: query.playlistId || 'PLRUeMuoAjPeAEAPYC6wOWTkto-fXC5GRh',
      maxResults: query.perPage,
      pageToken: query.pageToken,
    });

    const items: youtube_v3.Schema$PlaylistItem[] = response.data.items || [];

    const musicTracks = await Promise.all(
      items.map(async (item) => {
        const normalizedFullTitle = this.helperService.normalizeString(
          `${item.snippet?.videoOwnerChannelTitle} ${item.snippet?.title}`,
        );
        const src =
          await this.mp3wrParserService.getMusicURL(normalizedFullTitle);

        return {
          id: item.id || '',
          author: item.snippet?.videoOwnerChannelTitle || null,
          title: item.snippet?.title || null,
          description: item.snippet?.description || null,
          image:
            item.snippet?.thumbnails?.high?.url ||
            item.snippet?.thumbnails?.default?.url ||
            null,
          audio: {
            src,
          },
          youtube: {
            videoId: item.snippet?.resourceId?.videoId || null,
          },
          links: [],
        };
      }),
    );

    const resultsPerPage = response.data.pageInfo?.resultsPerPage || 0;
    const totalResults = response.data.pageInfo?.totalResults || 0;
    const nextPageToken = response.data.nextPageToken || null;

    return new ytPlaylistResponseDto(musicTracks, {
      nextPageToken,
      perPage: resultsPerPage,
      total: totalResults,
      pages: Math.ceil(totalResults / resultsPerPage),
    });

    // let items = data.items || null;
    //
    // if (items) {
    //   items = await Promise.all(
    //     items.map(async (item: any) => {
    //       const videoId = item.snippet.resourceId.videoId;
    //       const videoOwnerChannelTitle =
    //         item.snippet.videoOwnerChannelTitle || null;
    //       const title = item.snippet.title;
    //       const description = item.snippet.description;
    //
    //       let audioSrc = null;
    //       let format = null;
    //
    //       try {
    //         const info = await ytdl.getInfo(videoId);
    //         format = ytdl.chooseFormat(info.formats, { quality: '140' });
    //         audioSrc = format.url;
    //       } catch (error) {
    //         console.error('Error chooseFormat', error);
    //       }
    //
    //       const searchStr1 = `${videoOwnerChannelTitle} ${title}`.replace(
    //         /(\([^)]*\)|\[[^\]]*\])/g,
    //         '',
    //       );
    //       const searchStr2 = title.replace(/(\([^)]*\)|\[[^\]]*\])/g, '');
    //
    //       audioSrc = await mp3wrParser(searchStr2);
    //
    //       return {
    //         id: item.id,
    //         videoOwnerChannelTitle,
    //         videoId: videoId,
    //         title: title,
    //         description: addThreeDots(description),
    //         image:
    //           item.snippet?.thumbnails?.high?.url ||
    //           item.snippet?.thumbnails?.default?.url ||
    //           null,
    //         src: audioSrc,
    //
    //         links: [
    //           {
    //             id: 'audioSrc',
    //             label: 'audio src',
    //             link: audioSrc,
    //           },
    //           {
    //             id: 'youtube',
    //             label: 'youtube',
    //             link: `https://www.youtube.com/watch?v=${videoId}`,
    //           },
    //           {
    //             id: 'saveFrom',
    //             label: 'saveFrom',
    //             link: `http://savefrom.net/?url=https://www.youtube.com/watch?v=${videoId}`,
    //           },
    //           {
    //             id: 'seFon1',
    //             label: 'seFon1',
    //             link: await sefonParser(searchStr2),
    //           },
    //           {
    //             id: 'seFon2',
    //             label: 'seFon2',
    //             link: await sefonParser(searchStr1),
    //           },
    //           {
    //             id: 'fm1',
    //             label: 'fm1',
    //             link: await fmParser(searchStr2),
    //           },
    //           {
    //             id: 'fm2',
    //             label: 'fm2',
    //             link: await fmParser(searchStr1),
    //           },
    //         ],
    //       };
    //     }),
    //   );
    // }
    //
    // return {
    //   items,
    //   pageInfo: {
    //     total: data?.pageInfo?.totalResults || null,
    //     perPage,
    //     pageToken: data?.nextPageToken || null,
    //   },
    // };
  }
}
