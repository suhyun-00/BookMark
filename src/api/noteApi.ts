import {
  collection,
  doc,
  addDoc,
  updateDoc,
  Timestamp,
  deleteDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

import { Note } from '@customTypes/note';

import db from '@/fireabase';

export const fetchNotes = async (userBookId: string) => {
  const condition = query(
    collection(db, 'notes'),
    where('userBookId', '==', userBookId)
  );
  const notesSnapshot = await getDocs(condition);
  return notesSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Note,
  );
};

export const addNote = async (userId: string, userBookId: string, content: string) => {
  await addDoc(collection(db, 'notes'), {
    userBookId: userBookId,
    userId: userId,
    content: content,
    createAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
    });
};

export const updateNote = async (noteId: string, content: string) => {
  const noteRef = doc(db, 'notes', noteId);
  if (noteRef) {
    await updateDoc(noteRef, {
      content: content,
      updatedAt: Timestamp.fromDate(new Date()),
    });
  }
};

export const deleteNote = async (noteId: string) => {
  await deleteDoc(doc(db, 'notes', noteId));
};
