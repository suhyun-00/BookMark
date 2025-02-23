import { useState } from 'react';

import { Feather } from 'lucide-react';

import { Note } from '@customTypes/note';

import Card from '@components/Modal/BookDetailModal/Card';
import NoteModal from '@components/Modal/BookDetailModal/NoteModal';

interface BookNotesProps {
  notes: Note[];
  userBookId: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleNotes: () => Promise<void>;
}

const BookNotes = ({ notes, userBookId, setIsLoading, handleNotes }: BookNotesProps) => {
  const [selectedNote, setSelectedNote] = useState<Note | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-end justify-center gap-2">
      <button
        onClick={() => {
          setSelectedNote(undefined);
          setIsOpen(true);
        }}
        className="flex items-center gap-1 rounded-lg bg-gray-200 px-4 py-1 text-sm text-gray-700 hover:cursor-pointer hover:inset-shadow-sm"
      >
        <Feather className="h-4 w-4" />
        노트 추가
      </button>

      <div className="scrollbar mt-1 flex max-h-56 w-full flex-col gap-2 overflow-y-scroll scroll-smooth text-gray-400">
        {notes.length !== 0 ? (
          notes.map((note) => (
            <Card
              note={note}
              onClick={() => {
                setSelectedNote(note);
                setIsOpen(true);
              }}
            />
          ))
        ) : (
          <div className="m-12 text-center">작성된 독서 노트가 없습니다.</div>
        )}
      </div>
      {isOpen && (
        <NoteModal
          userBookId={userBookId}
          selectedNote={selectedNote}
          setIsOpen={setIsOpen}
          setIsLoading={setIsLoading}
          setSelectedNote={setSelectedNote}
          handleNotes={handleNotes}
        />
      )}
    </div>
  );
};

export default BookNotes;
