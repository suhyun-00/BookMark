import { useState } from 'react';

import { DocumentData } from 'firebase/firestore';

import { Book } from '@customTypes/books';

import BookDescription from '@components/Modal/BookDetailModal/BookDescription';

interface BookContentProps {
  book: Book;
  bookSnap: DocumentData;
}

const BookContent = ({ book, bookSnap }: BookContentProps) => {
  const [selected, setSelected] = useState<string>('description');

  return (
    <div>
      <div className="flex w-fit gap-2">
        <button
          onClick={() => setSelected('description')}
          className={`rounded-lg px-4 py-1 text-sm text-gray-500 ${selected === 'description' ? 'bg-gray-200 text-gray-700' : 'hover:bg-gray-200 hover:text-gray-700'} hover:cursor-pointer hover:inset-shadow-sm`}
        >
          책 정보
        </button>
        <button
          onClick={() => setSelected('note')}
          className={`rounded-lg px-4 py-1 text-sm text-gray-500 ${selected === 'note' ? 'bg-gray-200 text-gray-700' : 'hover:bg-gray-200 hover:text-gray-700'} hover:cursor-pointer hover:inset-shadow-sm`}
        >
          독서 노트
        </button>
      </div>
      {selected === 'description' && <BookDescription bookSnap={bookSnap} book={book} />}
      {selected === 'note' && <></>}
    </div>
  );
};

export default BookContent;
