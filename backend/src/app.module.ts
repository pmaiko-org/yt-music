import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './common/logger/logger.module';
import { RequestModule } from './common/request/request.module';
import { HelperModule } from './common/services/helper/helper.module';
import { MusicModule } from './modules/music/music.module';
import { CatsModule } from './modules/cats/cats.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { GoogleDriveModule } from './common/services/google-drive/google-drive.module';
import configuration, { EnvironmentVariables } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageOptimizerModule } from './common/services/image-optimizer/image-optimizer.module';

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
          entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
          synchronize: true,
          charset: 'utf8mb4_unicode_ci',
        };
      },
    }),
    LoggerModule,
    RequestModule,
    HelperModule,

    CatsModule,
    MusicModule,
    TelegramModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
