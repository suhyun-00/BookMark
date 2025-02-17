import { useEffect, useRef, useState } from 'react';
import { Book, BookStatusType } from '@customTypes/books';
import STATUS from '@constants/STATUS';
import { BookOpen, Star, X } from 'lucide-react';
import { DocumentData, DocumentReference, Timestamp, updateDoc } from 'firebase/firestore';
import { fetchBook, fetchUserBook } from '@api/bookApi';
import BookDescription from '@components/Modal/BookDetailModal/BookDescription';
import DateField from '@components/Modal/BookDetailModal/DateField';
import DrawStar from '@components/Modal/BookDetailModal/DrawStar';
import ScaleLoader from 'react-spinners/ScaleLoader';

interface BookDetailModalProps {
  onClose: () => void;
  book: Book;
  handleBookUpdate: () => Promise<void>;
}

const BookDetailModal = ({ onClose, book, handleBookUpdate }: BookDetailModalProps) => {
  const formatDate = (timestamp: Timestamp) => {
    return new Date(timestamp.toDate().getTime() - timestamp.toDate().getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
  };

  const [bookSnap, setBookSnap] = useState<DocumentData>();
  const [docRef, setDocRef] = useState<DocumentReference<DocumentData, DocumentData>>();

  const [selected, setSelected] = useState<string>('description');
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [status, setStatus] = useState<BookStatusType>(book.status);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rating, setRating] = useState<number>(book.rating);
  const [startAt, setStartAt] = useState<string>(book.startAt ? formatDate(book.startAt) : '');
  const [finishedAt, setFinishedAt] = useState<string>(
    book.finishedAt ? formatDate(book.finishedAt) : '',
  );

  const prevStartAt = useRef<string>(startAt);
  const prevFinishedAt = useRef<string>(finishedAt);
  const prevRating = useRef<number>(rating);
  const prevCurrentPage = useRef<number>(currentPage);
  const prevStatus = useRef<BookStatusType>(status);

  const handleUpdate = async () => {
    setIsLoading(true);
    const updateFields: Record<string, Timestamp | BookStatusType | number> = {};

    if (prevStartAt.current !== startAt) {
      updateFields.startAt = Timestamp.fromDate(new Date(startAt + 'T00:00:00'));
      prevStartAt.current = startAt;
    }

    if (prevFinishedAt.current !== finishedAt) {
      updateFields.finishedAt = Timestamp.fromDate(new Date(finishedAt + 'T00:00:00'));
      prevFinishedAt.current = finishedAt;
    }

    if (prevRating.current !== rating) {
      updateFields.rating = rating;
      prevRating.current = rating;
    }

    if (prevCurrentPage.current !== currentPage) {
      updateFields.currentPage = currentPage;
      prevCurrentPage.current = currentPage;
    }

    if (prevStatus.current !== status) {
      updateFields.status = status;
      prevStatus.current = status;
    }

    if (Object.keys(updateFields).length !== 0) {
      if (docRef) {
        await updateDoc(docRef, updateFields);
        await handleBookUpdate();
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const getBook = async () => {
      const bookSnap = await fetchBook(book.id.toString());
      if (bookSnap.exists()) setBookSnap(bookSnap.data());

      const { docRef, docSnap } = await fetchUserBook(book.id.toString());
      if (docRef) setDocRef(docRef);
      if (docSnap.exists()) setCurrentPage(docSnap.data().currentPage);
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
        className="flex max-h-[40rem] w-4xl min-w-4xl flex-col gap-6 rounded-xl bg-gray-100 p-10 inset-shadow-sm"
      >
        <div className="flex items-start gap-8">
          <img src={book.cover} alt={book.title} className="h-56 w-40" />
          <div className="relative flex w-full flex-col">
            <div className="mb-3 flex items-center gap-4">
              <div className="rounded-lg bg-gray-200 px-2 py-1 text-xs font-normal text-gray-600 inset-shadow-sm">
                {isEditting ? (
                  <select
                    onChange={(e) => setStatus(e.target.value as BookStatusType)}
                    className="focus:outline-none"
                  >
                    {Object.entries(STATUS).map(([key, value]) => (
                      <option value={key} selected={book.status === key}>
                        {value}
                      </option>
                    ))}
                  </select>
                ) : (
                  STATUS[book.status]
                )}
              </div>
              {isEditting ? (
                <DrawStar rating={rating} setRating={setRating} />
              ) : (
                <div className="flex items-center gap-1 text-sm text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  {book.rating}
                </div>
              )}
            </div>
            <div className="absolute -top-4 -right-4 flex items-center gap-1">
              <button
                onClick={() => {
                  if (isEditting) {
                    handleUpdate();
                  }
                  setIsEditting((prevStatus) => !prevStatus);
                }}
                className="rounded-lg bg-gray-200 px-3 py-1 text-sm text-gray-600 inset-shadow-sm hover:cursor-pointer hover:bg-gray-300"
              >
                {isEditting ? '완료' : '수정'}
              </button>
              <div
                onClick={onClose}
                className="rounded-lg px-2 py-1 text-gray-600 hover:cursor-pointer hover:bg-gray-200 hover:inset-shadow-sm"
              >
                <X className="h-5 w-5" />
              </div>
            </div>
            <div className="w-full truncate">
              <div className="mb-2 text-2xl font-medium">{book.title}</div>
              <div className="mb-5 text-gray-500">{book.author}</div>
            </div>
            <div className="mb-5 grid grid-cols-3 gap-4 text-gray-500">
              <DateField
                isEditting={isEditting}
                text="시작일"
                timestamp={book.startAt}
                date={startAt}
                setDate={setStartAt}
              />
              <DateField
                isEditting={isEditting}
                text="완독일"
                timestamp={book.finishedAt}
                date={finishedAt}
                setDate={setFinishedAt}
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
                      value={currentPage}
                      onChange={(e) => setCurrentPage(Number(e.target.value))}
                      className={`w-16 px-2 text-center font-medium focus:outline-none ${isEditting ? 'hover: cursor-pointer' : ''}`}
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
