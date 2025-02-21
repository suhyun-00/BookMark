import { useEffect, useState } from 'react';

import { DocumentData } from 'firebase/firestore';
import ScaleLoader from 'react-spinners/ScaleLoader';

import { Book } from '@customTypes/books';

import { fetchBook, deleteBook } from '@api/bookApi';

import BookOverview from '@components/Modal/BookDetailModal/BookOverview';

interface BookDetailModalProps {
  onClose: () => void;
  book: Book;
  handleBookUpdate: () => Promise<void>;
}

const BookDetailModal = ({ onClose, book, handleBookUpdate }: BookDetailModalProps) => {
  const [bookSnap, setBookSnap] = useState<DocumentData>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClicked, setIsClicekd] = useState<boolean>(false);

  const handleDelete = async () => {
    await deleteBook(book.id.toString());
    setIsClicekd(false);
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
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-xs">총 페이지</span>
                  <div className="text-sm">{bookSnap?.page.toLocaleString()} 페이지</div>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <div
                className={`mb-3 flex items-center justify-between ${isEditting ? 'text-blue-500' : ''}`}
              >
                <div>진행률</div>
                {isEditting ? (
                  <div>
                    <input
                      type="number"
                      value={currentPage.toString()}
                      onChange={(e) => setCurrentPage(Number(e.target.value))}
                      className={`w-16 border-b px-2 text-center font-medium focus:outline-none ${isEditting ? 'hover: cursor-pointer' : ''}`}
                    />
                    페이지
                  </div>
                ) : (
                  <div>{book.progress}%</div>
                )}
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full ${isEditting ? 'bg-blue-500' : 'bg-gray-900'}`}
                  style={{ width: `${book.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
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
        {isEditting && (
          <button
            onClick={() => setIsClicekd(true)}
            className="flex items-center justify-center py-2 text-red-500 hover:cursor-pointer"
          >
            서재에서 삭제하기
          </button>
        )}
        {isClicked && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900/20 text-gray-500">
            <div className="flex h-40 w-80 flex-col items-center gap-4 rounded-2xl bg-gray-200">
              <div className="mt-14 text-lg">책을 삭제하시겠습니까?</div>
              <div className="mt-3 flex w-full items-center justify-around border-t border-gray-300">
                <button
                  onClick={() => setIsClicekd(false)}
                  className="h-full w-full rounded-bl-2xl border-r border-gray-300 py-3 hover:cursor-pointer hover:bg-gray-300"
                >
                  취소
                </button>
                <button
                  onClick={handleDelete}
                  className="h-full w-full rounded-br-2xl py-3 text-red-500 hover:cursor-pointer hover:bg-gray-300"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        )}
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
