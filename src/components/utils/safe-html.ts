// src/utils/safe-html.ts
import DOMPurify from 'dompurify';

export const createSafeHTML = (dirty: string, maxLength?: number) => {
  if (!dirty) return '';
  let clean = DOMPurify.sanitize(dirty);
  if (maxLength) {
    clean = clean.slice(0, maxLength) + (clean.length > maxLength ? '...' : '');
  }
  return clean;
};