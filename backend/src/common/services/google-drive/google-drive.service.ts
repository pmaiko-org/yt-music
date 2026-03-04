import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drive_v3, google } from 'googleapis';
import { JWT } from 'google-auth-library/build/src/auth/jwtclient';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';
import { EnvironmentVariables } from '../../../config/configuration';
import { Readable } from 'node:stream';
import { HelperService } from '../helper/helper.service';
import * as fs from 'node:fs';

type AuthType = JWT | OAuth2Client;

@Injectable()
export class GoogleDriveService {
  private readonly authClient: AuthType;
  private readonly googleDriveFolderId: string;
  private driveInstance: drive_v3.Drive;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly helperService: HelperService,
  ) {
    this.authClient = this.getOAuthClient();
    this.googleDriveFolderId = this.configService.get('googleDriveFolderId')!;
    this.driveInstance = google.drive({ version: 'v3', auth: this.authClient });
  }

  getOAuthClient() {
    const oauth2Client = new google.auth.OAuth2(
      this.configService.get('googleClientId'),
      this.configService.get('googleClientSecret'),
      this.configService.get('googleRedirectUri'),
    );
    oauth2Client.setCredentials({
      refresh_token: this.configService.get('googleRefreshToken'),
    });
    return oauth2Client;
  }

  async authorize() {
    const apiKeys = JSON.parse(
      this.configService.get('googleServiceAccountKey')!,
    ) as Record<string, string>;
    const scopes = ['https://www.googleapis.com/auth/drive'];

    const auth = new google.auth.JWT({
      email: apiKeys.client_email,
      key: apiKeys.private_key.replace(/\\n/g, '\n'),
      scopes,
    });

    try {
      await auth.authorize();
      return auth;
    } catch (error: unknown) {
      throw new Error('Error authorizing Google Drive API', {
        cause: error,
      });
    }
  }

  async listFiles() {
    const response = await this.driveInstance.files.list({
      pageSize: 100,
      q: `'${this.googleDriveFolderId}' in parents and trashed = false`,
      fields: 'files(id, name)',
    });

    return response.data.files ?? [];
  }

  readFile() {
    return Buffer.from('test');
  }

  async uploadFile(
    buffer: Buffer,
    filename: string,
    mimetype?: string,
    properties?: drive_v3.Schema$File['properties'],
  ): Promise<drive_v3.Schema$File | undefined> {
    const stream = Readable.from(buffer);

    try {
      const response = await this.driveInstance.files.create({
        requestBody: {
          name: filename,
          parents: [this.googleDriveFolderId], // petyamaiko/yt-music
          properties,
        },
        media: {
          mimeType: mimetype || this.helperService.getMimeType(filename),
          body: stream,
        },
        fields: 'id, name',
      });

      // console.log('File uploaded successfully. File ID:', response.data.id);

      return response.data;
    } catch (error: unknown) {
      throw new Error('Error uploading file to Google Drive', {
        cause: error,
      });
    }
  }

  async deleteFile(fileId: string) {
    try {
      await this.driveInstance.files.delete({
        fileId: fileId,
      });

      // console.log('File deleted successfully.');
    } catch (error: unknown) {
      throw new Error('Error deleting file from Google Drive', {
        cause: error,
      });
    }
  }

  async updateFile(fileId: string, filePath: string) {
    const fileMetadata = {
      name: filePath.split('/').pop(), // Extract file name from path
    };

    const media = {
      mimeType: 'application/octet-stream',
      body: fs.createReadStream(filePath), // Readable stream for file update
    };

    try {
      await this.driveInstance.files.update({
        requestBody: fileMetadata,
        fileId: fileId,
        media: media,
      });

      // console.log('File updated successfully.', response);
    } catch (error: unknown) {
      throw new Error('Error updating file in Google Drive', {
        cause: error,
      });
    }
  }

  async getFileByName(filename: string) {
    try {
      const response = await this.driveInstance.files.list({
        q: `'${this.googleDriveFolderId}' in parents and name='${filename}' and trashed=false`,
        fields: 'files(id, name, mimeType)',
        pageSize: 1,
      });

      const files = response.data.files;
      if (files?.length) {
        // console.log('Found file:', files[0].name, files[0].id);
        return files[0];
      } else {
        // console.log('No file found with this name.');
        return null;
      }
    } catch (error) {
      throw new Error('Error getting file by name', {
        cause: error,
      });
    }
  }

  async getFileById(fileId: string): Promise<drive_v3.Schema$File> {
    try {
      const response = await this.driveInstance.files.get({
        fileId,
        fields: 'id, name, mimeType, size, properties',
      });

      return response.data;
    } catch (error: unknown) {
      throw new Error('Error getting file by ID', {
        cause: error,
      });
    }
  }

  async getStream(file: drive_v3.Schema$File) {
    const fileResponse = await this.driveInstance.files.get(
      {
        fileId: file.id!,
        alt: 'media',
      },
      {
        responseType: 'stream',
      },
    );

    return {
      stream: fileResponse.data,
      name: file.name,
      filename: file.properties?.filename || file.name || 'unknown',
      mimeType: file.mimeType || 'application/octet-stream',
      size: file.size,
      isAudio: 'true' === file.properties?.isAudio,
    };
  }
}
