import { Command, CommandRunner } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { GoogleDriveAuthService } from './google-drive-auth.service';

@Injectable()
@Command({
  name: 'google-drive-auth',
  description: 'Generate Google OAuth2 token',
})
export class GoogleDriveAuthCommand extends CommandRunner {
  constructor(private readonly googleDriveAuthService: GoogleDriveAuthService) {
    super();
  }

  async run(): Promise<void> {
    await this.googleDriveAuthService.promptForCodeAndRetrieveToken();
  }
}
