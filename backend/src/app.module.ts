import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './common/logger/logger.module';
import { RequestModule } from './common/request/request.module';
import { HelperModule } from './common/services/helper.module';
import { MusicModule } from './features/music/music.module';
import { CatsModule } from './features/cats/cats.module';
import { TelegramModule } from './features/telegram/telegram.module';
import { StorageModule } from './features/storage/storage.module';
import { GoogleDriveModule } from './features/google-drive/google-drive.module';
import configuration, { EnvironmentVariables } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => {
        const db = configService.get('db', { infer: true })!;

        return {
          type: 'postgres',
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.database,
          entities: [__dirname + '/features/**/*.entity{.ts,.js}'],
          synchronize: true,
          charset: 'utf8mb4_unicode_ci',
        };
      },
    }),
    LoggerModule,
    RequestModule,
    HelperModule,
    MusicModule,
    CatsModule,
    TelegramModule,
    StorageModule,
    GoogleDriveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
