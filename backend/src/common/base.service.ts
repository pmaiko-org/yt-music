import { Repository, FindManyOptions, ObjectLiteral } from 'typeorm';
import {
  PaginationMetaDto,
  PaginationResponseDto,
} from './dto/pagination.response.dto';
import { PaginationQueryInterface } from './interface/pagination.query.interface';

export interface PaginationQuery {
  page?: number;
  perPage?: number;
}

export class BaseService<Entity extends ObjectLiteral, Dto> {
  constructor(
    protected readonly repository: Repository<Entity>,
    private readonly dtoClass: new (entity: Entity) => Dto,
  ) {}

  async paginate(
    query: PaginationQueryInterface,
    options?: FindManyOptions<Entity>,
  ): Promise<PaginationResponseDto<Dto>> {
    const page = query.page ?? 1;
    const perPage = query.perPage ?? 10;

    const [entities, total] = await this.repository.findAndCount({
      ...options,
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const data = entities.map((entity) => new this.dtoClass(entity));

    return new PaginationResponseDto(
      data,
      new PaginationMetaDto(page, perPage, total, Math.ceil(total / perPage)),
    );
  }
}
