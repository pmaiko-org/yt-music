import {
  PaginationResponseInterface,
  PaginationMetaInterface,
} from '../interface/pagination.response.interface';

export class PaginationResponseDto<T>
  implements PaginationResponseInterface<T>
{
  constructor(
    public data: T[],
    public meta: PaginationMetaDto,
  ) {}
}

export class PaginationMetaDto implements PaginationMetaInterface {
  constructor(
    public page: number,
    public perPage: number,
    public total: number,
    public pages: number,
  ) {}
}
