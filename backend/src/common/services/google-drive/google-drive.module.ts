import { Module } from '@nestjs/common';
import { GoogleDriveService } from './google-drive.service';
import { GoogleDriveAuthService } from './google-drive-auth.service';
import { GoogleDriveAuthCommand } from './google-drive-auth.command';

@Module({
  exports: [GoogleDriveService],
  providers: [
    GoogleDriveService,
    GoogleDriveAuthService,
    GoogleDriveAuthCommand,
  ],
})
export class GoogleDriveModule {}
