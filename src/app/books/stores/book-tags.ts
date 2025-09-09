export const BOOK_TAGS = [
  'science fiction',
  'historical',
  'psychology',
  'young adult',
  'mystery',
  // add more tags here if you want
] as const;

export type BookTag = typeof BOOK_TAGS[number];