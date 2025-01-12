export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface DocumentEntry {
  platform: string;
  topic: string;
  content: string;
  keywords: string[];
}

export type Platform = 'segment' | 'mparticle' | 'lytics' | 'zeotap';