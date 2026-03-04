export interface MusicParserInterface {
  getMusicURL: (search: string) => Promise<string | undefined>;
}
