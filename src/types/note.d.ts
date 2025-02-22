import { Timestamp } from 'firebase/firestore';

export interface Note {
  userBookId: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
}
