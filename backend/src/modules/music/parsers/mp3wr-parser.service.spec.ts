import { Test, TestingModule } from '@nestjs/testing';
import { Mp3wrParserService } from './mp3wr-parser.service';

describe('Mp3wrParserService', () => {
  let service: Mp3wrParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Mp3wrParserService],
    }).compile();

    service = module.get<Mp3wrParserService>(Mp3wrParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
