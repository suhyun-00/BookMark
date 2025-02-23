import { Timestamp } from 'firebase/firestore';

export type BookStatusType = 'planned' | 'reading' | 'completed' | 'paused';

export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  progress: number;
  startAt: Timestamp | null;
  finishedAt: Timestamp | null;
  updatedAt: Timestamp;
  rating: number;
  status: BookStatusType;
}
