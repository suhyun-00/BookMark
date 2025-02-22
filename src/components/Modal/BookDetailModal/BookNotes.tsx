import { useEffect, useState } from 'react';

import { Feather } from 'lucide-react';

import { Note } from '@customTypes/note';

import { fetchNotes } from '@api/noteApi';

import Card from '@components/Modal/BookDetailModal/Card';

interface BookNotesProps {
  notesId: Array<string>;
}

const BookNotes = ({ notesId }: BookNotesProps) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const handleNotes = async () => {
      const notes = await fetchNotes(notesId);
      setNotes(notes);
    };

    handleNotes();
  }, [notesId]);

  return (
    <div className="flex flex-col items-end justify-center gap-2">
      <button className="flex items-center gap-1 rounded-lg bg-gray-200 px-4 py-1 text-sm text-gray-700 hover:cursor-pointer hover:inset-shadow-sm">
        <Feather className="h-4 w-4" />
        노트 추가
      </button>
      <div className="mt-1 flex gap-1">
        {notes.map((note) => (
          <Card note={note} />
        ))}
      </div>
    </div>
  );
};

export default BookNotes;
