import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { TelegramService } from './telegram.service';
import { EnvironmentVariables } from '../../config/configuration';

@Controller()
export class TelegramController {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly telegramService: TelegramService,
  ) {}

  @Get('/bot/me')
  async getMe() {
    const bot = this.telegramService.getBot();
    return await bot.getMe();
  }

  @Get('/bot/setWebHook/:host')
  async setWebHook(@Param('host') host: string) {
    const bot = this.telegramService.getBot();
    try {
      await bot.setWebHook(
        `${host}/api/bot/update/${this.configService.get('telegramBotToken')}`,
      );
      return this.getWebHookInfo();
    } catch (error: unknown) {
      return error;
    }
  }

  @Get('/bot/getWebHookInfo')
  async getWebHookInfo() {
    const bot = this.telegramService.getBot();
    return await bot.getWebHookInfo();
  }

  @Get('/bot/deleteWebHook')
  async deleteWebHook() {
    const bot = this.telegramService.getBot();
    return await bot.deleteWebHook();
  }

  @HttpCode(200)
  @Post('/bot/update/:token')
  processUpdate(
    @Param('token') token: string,
    @Body() body: TelegramBot.Update,
  ) {
    if (token !== this.configService.get('telegramBotToken')) {
      return new NotFoundException();
    }
    const bot = this.telegramService.getBot();
    bot.processUpdate(body);
  }
}
