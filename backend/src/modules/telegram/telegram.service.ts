import { Injectable, OnModuleInit } from '@nestjs/common';
import TelegramBot, { Message } from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { YtMusicService } from '../music/services/yt-music.service';
import { YtPlaylistQueryDto } from '../music/dto/yt-playlist.query.dto';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: TelegramBot;
  private readonly serverAddress: boolean;
  private readonly isProd: boolean;
  private readonly telegramBotToken: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly ytMusicService: YtMusicService,
  ) {
    this.serverAddress = this.configService.get('serverAddress') as boolean;
    this.isProd = this.configService.get('isProd') as boolean;
    this.telegramBotToken = this.configService.get(
      'telegramBotToken',
    ) as string;
  }

  onModuleInit() {
    this.bot = new TelegramBot(this.telegramBotToken, {
      polling: !this.isProd,
    });

    // if (this.isProd) {
    //   const webhookUrl = `${this.serverAddress}/bot${this.telegramBotToken}`;
    //   this.bot
    //     .setWebHook(webhookUrl)
    //     .then(() => console.log('Webhook set successfully:', webhookUrl))
    //     .catch((err) => console.error('Error setting webhook:', err));
    // }

    this.registerHandlers();
  }

  private registerHandlers() {
    this.bot.onText(/\/start/, async (msg: Message) => {
      const chatId = msg.chat.id;
      await this.bot.sendMessage(chatId, 'Hello!', {
        reply_markup: {
          keyboard: [
            [
              {
                text: 'Open Web App',
                web_app: { url: 'https://www.google.com' },
              },
              { text: 'Get Location', request_location: true },
              { text: 'Get Contact', request_contact: true },
              { text: '/playlist' },
              { text: 'ok' },
            ],
          ],
          one_time_keyboard: true,
        },
      });
    });

    this.bot.onText(/\/test/, async (msg: Message) => {
      await this.bot.sendMessage(msg.chat.id, '<b>Hello!</b>', {
        parse_mode: 'HTML',
      });
    });

    this.bot.onText(/\/playlist/, async (msg: Message) => {
      const chatId = msg.chat.id;
      const { data } = await this.ytMusicService.getPlaylist(
        new YtPlaylistQueryDto(),
      );
      data.forEach((item) => {
        if (item.audio.src) {
          this.bot.sendMessage(
            chatId,
            `<a href="${item.audio.src}">${chatId} - ${item.title}</a>`,
            {
              parse_mode: 'HTML',
            },
          );
        }
      });
    });

    // /echo
    this.bot.onText(
      /\/echo (.+)/,
      async (msg: Message, match: RegExpExecArray | null) => {
        if (match) {
          await this.bot.sendMessage(msg.chat.id, match[1]);
        }
      },
    );

    // generic message
    this.bot.on('message', async (msg: Message) => {
      if (msg.text === 'close') {
        await this.bot.sendMessage(msg.chat.id, 'closed!', {
          reply_markup: { remove_keyboard: true },
        });
      }
    });
  }

  getBot() {
    return this.bot;
  }
}
