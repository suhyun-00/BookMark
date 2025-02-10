import { Timestamp } from 'firebase/firestore';

type BookStatusType = 'planned' | 'reading' | 'completed' | 'paused';

export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  progress: number;
  startAt: Timestamp | null;
  finishedAt: Timestamp | null;
  rating: number;
  status: BookStatusType;
}
