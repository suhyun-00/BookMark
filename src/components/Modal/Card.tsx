import { Plus } from "lucide-react";
import type { Data } from "@customTypes/data";

const Card = ({ book }: { book: Data }) => {
  return (
    <div className="flex items-start gap-6 rounded-lg p-4 text-sm hover:bg-gray-200">
      <img
        src={book.image}
        alt={book.title}
        className="h-28 w-20 rounded-md shadow-sm"
      />
      <div className="flex h-28 w-full justify-between">
        <div className="flex max-w-76 flex-col">
          <div className="mb-1 truncate text-lg font-medium">{book.title}</div>
          <div className="mb-2 truncate text-sm text-gray-700">
            {book.author}
          </div>
          <div className="truncate text-sm font-light text-gray-500">
            {book.publisher} ⋅ {book.pubdate.slice(0, 4)}
          </div>
        </div>
        <button className="my-auto flex items-center justify-center gap-3 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:cursor-pointer hover:bg-neutral-700">
          <Plus className="h-3 w-3" />
          추가
        </button>
      </div>
    </div>
  );
};

export default Card;
