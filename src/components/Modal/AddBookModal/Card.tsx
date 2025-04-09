import { Plus } from 'lucide-react';

import type { Data } from '@customTypes/data';

import { addBook } from '@api/bookApi';

interface CardProps {
  book: Data;
  onClose: () => void;
  getBooks: () => Promise<void>;
}

const Card = ({ book, onClose, getBooks }: CardProps) => {
  const userId = 'test';

  const handleAddBook = async () => {
    await addBook(book, userId);
    await getBooks();
    onClose();
  };

  return (
    <div className="flex items-start gap-3 rounded-lg p-2 text-sm hover:bg-gray-200 sm:gap-6 sm:p-4">
      <img src={book.cover} alt={book.title} className="h-28 w-20 rounded-md shadow-sm" />
      <div className="flex h-28 w-full justify-between">
        <div className="flex flex-col sm:max-w-76">
          <h3 className="mb-1 line-clamp-2 font-medium whitespace-normal sm:line-clamp-none sm:truncate sm:text-lg sm:whitespace-nowrap">
            {book.title}
          </h3>
          <h4 className="mb-2 truncate text-xs text-gray-700 sm:text-sm">
            {book.author.replace(/ 지음.*/, ' 지음')}
          </h4>
          <h5 className="truncate text-xs font-light text-gray-500 sm:text-sm">
            {book.publisher} ⋅ {book.pubDate.slice(0, 4)}
          </h5>
        </div>
        <button
          onClick={handleAddBook}
          className="my-auto flex items-center justify-center gap-3 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:cursor-pointer hover:bg-neutral-700"
        >
          <Plus className="h-3 w-3" />
          등록
        </button>
      </div>
    </div>
  );
};

export default Card;
