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
        className="flex max-h-[42rem] w-4xl min-w-4xl flex-col gap-6 rounded-xl bg-gray-100 p-10 inset-shadow-sm"
      >
        <BookOverview
          book={book}
          totalPage={bookSnap?.page}
          onClose={onClose}
          handleBookUpdate={handleBookUpdate}
          setIsLoading={setIsLoading}
        />
        <BookContent book={book} bookSnap={bookSnap!} />
        <button
          onClick={() => setIsClicked(true)}
          className="flex items-center justify-center text-red-500 hover:cursor-pointer"
        >
          서재에서 삭제하기
        </button>
        {isClicked && <DeleteModal setIsClicked={setIsClicked} handleDelete={handleDelete} />}
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
