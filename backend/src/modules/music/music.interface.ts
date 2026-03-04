export interface MusicTrackInterface {
  id: string;
  author: string | null;
  title: string | null;
  description: string | null;
  image: string | null;
  audio: {
    src: string | null;
  };
  youtube: {
    videoId: string | null;
  };
  links: {
    label: string;
    value: string;
  }[];
}
