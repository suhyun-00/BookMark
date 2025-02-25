import { useEffect, useState } from 'react';

import { DocumentData } from 'firebase/firestore';
import ScaleLoader from 'react-spinners/ScaleLoader';

import { Book } from '@customTypes/books';

import { fetchBook, deleteBook } from '@api/bookApi';

import BookContent from '@components/Modal/BookDetailModal/BookContent';
import BookOverview from '@components/Modal/BookDetailModal/BookOverview';
import DeleteModal from '@components/Modal/BookDetailModal/DeleteModal';

interface BookDetailModalProps {
  onClose: () => void;
  book: Book;
  handleBookUpdate: () => Promise<void>;
}

const BookDetailModal = ({ onClose, book, handleBookUpdate }: BookDetailModalProps) => {
  const [bookSnap, setBookSnap] = useState<DocumentData>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleDelete = async () => {
    await deleteBook(book.id.toString());
    setIsClicked(false);
    onClose();
  };

  useEffect(() => {
    const getBook = async () => {
      const bookSnap = await fetchBook(book.id.toString());
      if (bookSnap.exists()) setBookSnap(bookSnap.data());
    };

    getBook();
  }, [book.id]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-gray-900/20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="scrollbar flex h-[80vh] w-[90vw] flex-col items-center gap-6 overflow-y-scroll rounded-xl bg-gray-100 pt-5 pb-10 inset-shadow-sm sm:max-h-[42rem] sm:w-4xl sm:min-w-4xl sm:items-start sm:p-10"
      >
        <BookOverview
          book={book}
          totalPage={bookSnap?.page}
          onClose={onClose}
          handleBookUpdate={handleBookUpdate}
          setIsLoading={setIsLoading}
          setIsClicked={setIsClicked}
        />
        <BookContent book={book} bookSnap={bookSnap!} />
        {isClicked && <DeleteModal setIsClicked={setIsClicked} handleDelete={handleDelete} />}
        <button
          onClick={() => setIsClicked(true)}
          className="block w-[70vw] py-2 text-red-600 sm:hidden"
        >
          책 삭제하기
        </button>
      </div>
      {isLoading && (
        <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-gray-900/20">
          <ScaleLoader color="#101828" />
        </div>
      )}
    </div>
  );
};

export default BookDetailModal;
