import { ResponseInterface } from './response.interface';

export interface PaginationResponseInterface<T, M = PaginationMetaInterface>
  extends ResponseInterface<T[], M> {
  data: T[];
  meta: M;
}

export interface PaginationMetaInterface {
  page: number;
  perPage: number;
  total: number;
  pages: number;
}
