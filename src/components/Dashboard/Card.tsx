import type { Book } from "@customTypes/books";
import { Star } from "lucide-react";

interface CardProps {
  key: number;
  book: Book;
}

const BookStatus = {
  wishlist: "읽을 예정",
  reading: "읽는 중",
  completed: "완독",
  dropped: "중단",
};

const Card = ({ key, book }: CardProps) => {
  const { title, author, cover, progress, rating, status } = book;

  return (
    <div
      key={key}
      className="group flex h-full max-w-md min-w-sm gap-4 rounded-xl bg-gray-100/80 p-5 inset-shadow-sm hover:cursor-pointer hover:bg-gray-200/60"
    >
      <img
        src={cover}
        alt={title}
        className="min-h-40 min-w-28 rounded-lg text-sm whitespace-normal shadow-sm"
      />
      <div className="w-full px-1 py-2">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">{BookStatus[status]}</div>
          <div className="flex items-center gap-1 text-sm text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            {rating}
          </div>
        </div>
        <div className="mt-2 mb-1 max-w-48 truncate text-lg font-medium">
          {title}
        </div>
        <div className="mb-4 max-w-48 truncate text-sm text-gray-600">
          {author}
        </div>
        <div className="text-xs text-gray-600">
          <div className="mb-2 flex items-center justify-between">
            <div>진행률</div>
            <div>{progress}%</div>
          </div>
          <div className="h-1.5 w-full rounded-full bg-gray-200">
            <div
              className="h-1.5 rounded-full bg-gray-900"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
