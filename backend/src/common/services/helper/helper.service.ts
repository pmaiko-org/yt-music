import { Injectable } from '@nestjs/common';
import { lookup } from 'mime-types';

@Injectable()
export class HelperService {
  normalizeString(str: string): string {
    if (!str) {
      return '';
    }
    return str.replace(/(\([^)]*\)|\[[^\]]*\])/g, '');
  }

  addThreeDots(text: string, limit = 200): string {
    text = text.trim();
    if (text.length <= limit) return text;
    text = text.slice(0, limit);
    const lastSpace = text.lastIndexOf(' ');
    if (lastSpace > 0) {
      text = text.substr(0, lastSpace);
    }
    return text + '...';
  }

  getMimeType(filename: string): string {
    return lookup(filename) || '';
  }

  getMimeTypeWebp(): string {
    return lookup('webp') || '';
  }
}
