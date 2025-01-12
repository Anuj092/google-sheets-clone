import Fuse from 'fuse.js';
import { DocumentEntry } from '../types';
import { documentationData } from '../data/documentation';

const fuseOptions = {
  keys: ['platform', 'topic', 'content', 'keywords'],
  threshold: 0.4,
  includeScore: true
};

const fuse = new Fuse(documentationData, fuseOptions);

export const searchDocumentation = (query: string): DocumentEntry | null => {
  const normalizedQuery = query.toLowerCase();
  
  // Handle non-CDP related questions
  const cdpKeywords = ['segment', 'mparticle', 'lytics', 'zeotap', 'cdp', 'platform'];
  const hasCDPContext = cdpKeywords.some(keyword => normalizedQuery.includes(keyword));
  
  if (!hasCDPContext) {
    return null;
  }

  const results = fuse.search(query);
  return results.length > 0 ? results[0].item : null;
};

export const generateResponse = (query: string): string => {
  const result = searchDocumentation(query);
  
  if (!result) {
    return "I can only answer questions related to CDP platforms (Segment, mParticle, Lytics, and Zeotap). Please ask a CDP-related question.";
  }
  
  return result.content;
};