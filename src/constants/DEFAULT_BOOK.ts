import type { Book } from '@customTypes/books';

const DEFAULT_BOOK: Book = {
  id: 0,
  title: '',
  author: '',
  cover: '',
  progress: 0,
  startAt: null,
  finishedAt: null,
  rating: 0,
  status: 'wishlist',
};

export default DEFAULT_BOOK;
