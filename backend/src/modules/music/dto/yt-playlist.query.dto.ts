import { PaginationQueryDto } from '../../../common/dto/pagination.query.dto';
import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';

export class YtPlaylistQueryDto extends PaginationQueryDto {
  @Optional()
  @Type(() => String)
  playlistId: string;

  @Optional()
  @Type(() => String)
  pageToken: string;
}
