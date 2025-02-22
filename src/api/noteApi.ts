import {
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  Timestamp,
  arrayUnion,
  deleteDoc,
} from 'firebase/firestore';

import { Note } from '@customTypes/note';

import db from '@/fireabase';

export const fetchNotes = async (notesId: Array<string>) => {
  const notes = await Promise.all(
    notesId.map(async (noteId) => {
      const noteRef = doc(db, 'notes', noteId);
      const noteData = await getDoc(noteRef);
      return { id: noteRef.id, ...noteData.data() } as Note;
    }),
  );
  return notes;
};

export const addNote = async (userId: string, userBookId: string, content: string) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const noteRef = await addDoc(collection(db, 'notes'), {
    userBookId: userBookId,
    userId: userId,
    content: content,
    createAt: Timestamp.fromDate(now),
    updatedAt: Timestamp.fromDate(now),
  });

  const bookRef = doc(db, 'userBooks', userBookId);
  if (bookRef) {
    await updateDoc(bookRef, {
      notes: arrayUnion(noteRef.id),
    });
  }
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

export const deleteNote = async (noteId: string, userBookId: string) => {
  await deleteDoc(doc(db, 'notes', noteId));

  const bookRef = doc(db, 'userBooks', userBookId);
  const bookSnap = await getDoc(bookRef);
  if (bookSnap.exists()) {
    const bookData = bookSnap.data();
    const notes = bookData.notes;
    const updatedNotes = notes.filter((note: string) => note !== noteId);
    await updateDoc(bookRef, {
      notes: updatedNotes,
    });
  }
};
