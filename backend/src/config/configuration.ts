const vars = {
  port: process.env.PORT || 3000,
  isProd: process.env.NODE_ENV === 'production',

  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },

  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
  googleApiKey: process.env.GOOGLE_API_KEY || '',
  googleServiceAccountKey: process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN || '',
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI || '',
  googleDriveFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID || '',
} as const;

export default () => vars;

export type EnvironmentVariables = typeof vars;
