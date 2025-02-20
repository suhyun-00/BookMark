import { DocumentData } from 'firebase/firestore';

import { Book } from '@customTypes/books';

interface BookDescriptionProps {
  bookSnap: DocumentData | undefined;
  book: Book;
}

const BookDescription = ({ bookSnap, book }: BookDescriptionProps) => {
  return (
    <div className="mt-4 p-1 text-gray-500">
      <h2 className="mb-2 text-gray-900">책 소개</h2>
      <div className="mb-6 text-sm whitespace-normal">
        {bookSnap?.description.replace(/<img[^>]*>\s*[^<]*<br\/?>/, '')}
      </div>
      <h2 className="mb-2 text-gray-900">출판 정보</h2>
      <div className="grid grid-cols-2 grid-rows-2 gap-y-4 text-sm">
        <div>
          <h5 className="mb-1 text-gray-700">출판사</h5>
          <p>{bookSnap?.publisher}</p>
        </div>
        <div>
          <h5 className="mb-1 text-gray-700">카테고리</h5>
          <p>{bookSnap?.category.join(' > ')}</p>
        </div>
        <div>
          <h5 className="mb-1 text-gray-700">ISBN</h5>
          <p>{book.id}</p>
        </div>
        <div>
          <h5 className="mb-1 text-gray-700">출간일</h5>
          <p>{bookSnap?.pubDate.split('-').join('. ')}</p>
        </div>
      </div>
    </div>
  );
};
export default BookDescription;
