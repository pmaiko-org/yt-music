import { Injectable } from '@nestjs/common';
import { parse } from 'node-html-parser';
import { RequestService } from '../../../common/request/request.service';
import { MusicParserInterface } from './interfaces/music-parser.interface';
import { MyLogger } from '../../../common/logger/my-logger';

@Injectable()
export class Mp3wrParserService implements MusicParserInterface {
  constructor(
    private logger: MyLogger,
    private readonly requestService: RequestService,
  ) {}

  async getMusicURL(search: string): Promise<string | undefined> {
    const domain = 'https://mp3wr.com';

    try {
      const slug = search
        .toLowerCase()
        .replace(/[\s-]+/g, '-')
        .replace(/^-|-$/g, '');

      const response = await this.requestService.get(
        `${domain}/search/${encodeURIComponent(slug)}`,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
          },
        },
      );

      const root = parse(response.data);
      const $block = root.querySelectorAll('.list-group-item[data-id]');
      return $block[0]?.getAttribute('data-id') || '';
    } catch (error: unknown) {
      this.logger.error(
        'Failed to retrieve music URL',
        error,
        Mp3wrParserService.name,
      );
    }
  }
}
