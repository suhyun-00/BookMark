import { useEffect, useState } from 'react';

import { Feather } from 'lucide-react';

import { Note } from '@customTypes/note';

import { fetchNotes } from '@api/noteApi';

import Card from '@components/Modal/BookDetailModal/Card';
import NoteModal from '@components/Modal/BookDetailModal/NoteModal';

interface BookNotesProps {
  userBookId: string;
  notesId: Array<string>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookNotes = ({ userBookId, notesId, setIsLoading }: BookNotesProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleNotes = async () => {
      const notes = await fetchNotes(notesId);
      setNotes(notes);
    };

    handleNotes();
  }, [notesId]);

  return (
    <div className="flex flex-col items-end justify-center gap-2">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 rounded-lg bg-gray-200 px-4 py-1 text-sm text-gray-700 hover:cursor-pointer hover:inset-shadow-sm"
      >
        <Feather className="h-4 w-4" />
        노트 추가
      </button>
      <div className="scrollbar mt-1 flex h-54 flex-col gap-2 overflow-y-scroll scroll-smooth text-gray-400">
        {notes.map((note) => (
          <Card
            note={note}
            onClick={() => {
              setSelectedNote(note);
              setIsOpen(true);
            }}
          />
        ))}
      </div>
      {isOpen && (
        <NoteModal
          userBookId={userBookId}
          selectedNote={selectedNote}
          setIsOpen={setIsOpen}
          setIsLoading={setIsLoading}
          setSelectedNote={setSelectedNote}
        />
      )}
    </div>
  );
};

export default BookNotes;
