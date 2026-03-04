import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

@Injectable()
export class ImageOptimizerService {
  async toWebp(buffer: Buffer): Promise<Buffer> {
    return await sharp(buffer)
      .webp({ quality: 60, effort: 6, alphaQuality: 75 })
      .toBuffer();
  }
}
