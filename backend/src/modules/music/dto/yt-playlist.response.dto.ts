import {
  PaginationResponseInterface,
  PaginationMetaInterface,
} from '../../../common/interface/pagination.response.interface';

export class ytPlaylistResponseDto<T>
  implements PaginationResponseInterface<T, ytPlaylistPaginationMetaDto>
{
  constructor(
    public data: T[],
    public meta: ytPlaylistPaginationMetaDto,
  ) {}
}

export class ytPlaylistPaginationMetaDto
  implements Omit<PaginationMetaInterface, 'page'>
{
  constructor(
    public nextPageToken: string | null,
    public perPage: number,
    public total: number,
    public pages: number,
  ) {}
}
