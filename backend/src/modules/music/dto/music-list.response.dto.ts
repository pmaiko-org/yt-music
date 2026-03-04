import { MusicDto } from './music.dto';
import { PaginationResponseDto } from '../../../common/dto/pagination.response.dto';

export class MusicListResponseDto extends PaginationResponseDto<MusicDto> {}
