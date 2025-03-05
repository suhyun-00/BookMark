import { Timestamp } from 'firebase/firestore';

export interface Note {
  id: string;
  userBookId: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
