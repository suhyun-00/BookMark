import { useEffect, useState, useRef } from 'react';

import { DocumentData } from 'firebase/firestore';
import ScaleLoader from 'react-spinners/ScaleLoader';

import { Book } from '@customTypes/books';
import { Note } from '@customTypes/note';

import { fetchUserBook } from '@api/bookApi';
import { fetchNotes } from '@api/noteApi';

import BookDetails from '@components/Modal/BookDetailModal/BookDetails';
import BookNotes from '@components/Modal/BookDetailModal/BookNotes';

interface BookContentProps {
  book: Book;
  bookSnap: DocumentData;
}

const BookContent = ({ book, bookSnap }: BookContentProps) => {
  const [selected, setSelected] = useState<string>('description');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const userBookId = useRef<string>('');

  const handleNotes = async () => {
    const notes = await fetchNotes(userBookId.current);
    setNotes(notes);
  };

  useEffect(() => {
    const handleNotesId = async () => {
      const { docId } = await fetchUserBook(book.id.toString());
      if (docId) userBookId.current = docId;
      handleNotes();
    };

    handleNotesId();
  }, [book.id]);

  return (
    <div className="w-[75vw] sm:w-full">
      <div className="flex w-fit gap-2">
        <button
          onClick={() => setSelected('description')}
          className={`rounded-lg px-4 py-2 text-sm text-gray-500 sm:py-1 ${selected === 'description' ? 'bg-gray-200 text-gray-700' : 'hover:bg-gray-200 hover:text-gray-700'} hover:cursor-pointer hover:inset-shadow-sm`}
        >
          책 정보
        </button>
        <button
          onClick={() => setSelected('note')}
          className={`rounded-lg px-4 py-2 text-sm text-gray-500 sm:py-1 ${selected === 'note' ? 'bg-gray-200 text-gray-700' : 'hover:bg-gray-200 hover:text-gray-700'} hover:cursor-pointer hover:inset-shadow-sm`}
        >
          독서 노트
        </button>
      </div>
      {selected === 'description' && <BookDetails bookSnap={bookSnap} book={book} />}
      {selected === 'note' && (
        <BookNotes
          notes={notes}
          userBookId={userBookId.current}
          setIsLoading={setIsLoading}
          handleNotes={handleNotes}
        />
      )}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center">
          <ScaleLoader color="#101828" />
        </div>
      )}
    </div>
  );
};

export default BookContent;
