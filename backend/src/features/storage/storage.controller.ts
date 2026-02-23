import {
  BadRequestException,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GoogleDriveService } from '../google-drive/google-drive.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('storage')
export class StorageController {
  constructor(private readonly googleDriveService: GoogleDriveService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 50 * 1024 * 1024 }, // 50M
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const { parseBuffer, selectCover, getSupportedMimeTypes } = await import(
      'music-metadata'
    );

    if (!getSupportedMimeTypes().includes(file.mimetype)) {
      throw new BadRequestException('File type is not supported.');
    }

    const data = await parseBuffer(file.buffer);
    const cover = selectCover(data.common.picture);

    await this.googleDriveService.uploadFile(
      file.buffer,
      file.originalname,
      file.mimetype,
    );

    if (cover) {
      await this.googleDriveService.uploadFile(
        Buffer.from(cover.data),
        '1',
        cover.format,
      );
    }

    return data
  }

  @Get()
  getList() {
    return this.googleDriveService.listFiles();
  }
}
