import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';
import * as readline from 'readline';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../../config/configuration';

@Injectable()
export class GoogleDriveAuthService {
  oAuth2Client: OAuth2Client;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    this.oAuth2Client = new google.auth.OAuth2(
      this.configService.get('googleClientId'),
      this.configService.get('googleClientSecret'),
      this.configService.get('googleRedirectUri'),
    );
  }

  getAuthUrl(): string {
    return this.oAuth2Client.generateAuthUrl({
      scope: ['https://www.googleapis.com/auth/drive'],
      access_type: 'offline',
      // prompt: 'consent',
    });
  }

  async promptForCodeAndRetrieveToken() {
    const authUrl = this.getAuthUrl();
    console.log(`Visit this URL to authorize the app: ${authUrl}`);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise<void>((resolve) => {
      rl.question('Enter the code from Google: ', async (code) => {
        try {
          const { tokens } = await this.oAuth2Client.getToken(
            decodeURIComponent(code.trim()),
          );
          console.log(`New refresh token: ${tokens.refresh_token || 'none'}`);
          rl.close();
          resolve();
        } catch (error) {
          console.error('Error retrieving token', error);
          rl.close();
        }
      });
    });
  }
}
