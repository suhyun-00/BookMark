import { Timestamp } from 'firebase/firestore';

import type { Book } from '@customTypes/books';

const DEFAULT_BOOK: Book = {
  id: 0,
  title: '',
  author: '',
  cover: '',
  progress: 0,
  startAt: null,
  finishedAt: null,
  updatedAt: Timestamp.fromDate(new Date()),
  rating: 0,
  status: 'planned',
};

export default DEFAULT_BOOK;
