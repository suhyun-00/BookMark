import { Star } from 'lucide-react';

import STATUS from '@constants/STATUS';
import type { Book } from '@customTypes/books';

interface CardProps {
  key: number;
  book: Book;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selected: React.Dispatch<React.SetStateAction<Book>>;
}

const Card = ({ key, book, setIsOpen, selected }: CardProps) => {
  const { title, author, cover, progress, rating, status } = book;

  return (
    <div
      key={key}
      onClick={() => {
        setIsOpen(true);
        selected(book);
      }}
      className="group flex max-w-full gap-3 rounded-xl bg-gray-100/80 p-5 inset-shadow-sm hover:cursor-pointer hover:bg-gray-200/60 sm:min-w-sm sm:gap-4"
    >
      <img
        src={cover}
        alt={title}
        className="h-35 rounded-lg text-sm whitespace-normal shadow-sm sm:h-40 sm:w-28"
      />
      <div className="w-full min-w-0 px-1 py-2">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">{STATUS[status]}</div>
          <div className="flex items-center gap-1 text-sm text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            {rating}
          </div>
        </div>
        <div className="mt-2 mb-1 truncate font-medium sm:text-lg">{title}</div>
        <div className="mb-4 truncate text-sm text-gray-600">{author}</div>
        <div className="text-xs text-gray-600">
          <div className="mb-2 flex items-center justify-between">
            <div>진행률</div>
            <div>{progress}%</div>
          </div>
          <div className="h-1.5 w-full rounded-full bg-gray-200">
            <div className="h-1.5 rounded-full bg-gray-900" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
