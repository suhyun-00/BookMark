import { doc, getDoc } from 'firebase/firestore';

import { Note } from '@customTypes/note';

import db from '@/fireabase';

export const fetchNotes = async (notesId: Array<string>) => {
  const notes = await Promise.all(
    notesId.map(async (noteId) => {
      const noteRef = doc(db, 'notes', noteId);
      const noteData = await getDoc(noteRef);
      return noteData.data() as Note;
    }),
  );
  return notes;
};
