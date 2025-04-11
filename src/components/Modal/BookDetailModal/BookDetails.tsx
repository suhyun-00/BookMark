import { DocumentData } from 'firebase/firestore';

import { Book } from '@customTypes/books';

interface BookDetailsProps {
  bookSnap: DocumentData | undefined;
  book: Book;
}

const BookDetails = ({ bookSnap, book }: BookDetailsProps) => {
  return (
    <div className="mt-4 w-[75vw] p-1 text-gray-600 sm:w-auto">
      <h3 className="mb-2 text-gray-900">책 소개</h3>
      <div className="mb-6 text-sm whitespace-normal">
        {bookSnap?.description.replace(/<img[^>]*>\s*[^<]*<br\/?>/, '')}
      </div>
      <h3 className="mb-2 text-gray-900">출판 정보</h3>
      <div className="flex grid-cols-2 grid-rows-2 flex-col gap-y-4 text-sm sm:grid">
        <div>
          <h5 className="mb-1 text-gray-700">출판사</h5>
          <p>{bookSnap?.publisher}</p>
        </div>
        <div>
          <h5 className="mb-1 text-gray-700">카테고리</h5>
          <p className="line-clamp-2 whitespace-normal">{bookSnap?.category.join(' > ')}</p>
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
export default BookDetails;
