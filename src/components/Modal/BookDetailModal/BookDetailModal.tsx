import { useEffect, useRef, useState } from 'react';
import { Book } from '@customTypes/books';
import STATUS from '@constants/STATUS';
import { BookOpen, Star, X } from 'lucide-react';
import { DocumentData, Timestamp, updateDoc } from 'firebase/firestore';
import BookDescription from '@components/Modal/BookDetailModal/BookDescription';
import { fetchBook, findDocumentId } from '@api/bookApi';
import DateField from '@components/Modal/BookDetailModal/DateField';

interface BookDetailModalProps {
  onClose: () => void;
  book: Book;
}

const BookDetailModal = ({ onClose, book }: BookDetailModalProps) => {
  const [bookSnap, setBookSnap] = useState<DocumentData>();
  const [selected, setSelected] = useState<string>('description');
const [isEditting, setIsEditting] = useState<boolean>(false);

  const formatDate = (timestamp: Timestamp) => {
    return new Date(timestamp.toDate().getTime() - timestamp.toDate().getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
  };

  const [startAt, setStartAt] = useState<string>(book.startAt ? formatDate(book.startAt) : '');
  const [finishedAt, setFinishedAt] = useState<string>(
    book.finishedAt ? formatDate(book.finishedAt) : '',
  );

  const prevStartAt = useRef<string>(startAt);
  const prevFinishedAt = useRef<string>(finishedAt);

  const handleUpdate = async () => {
    const updateFields: Record<string, Timestamp | number> = {};

    if (prevStartAt.current !== startAt) {
      updateFields.startAt = Timestamp.fromDate(new Date(startAt + 'T00:00:00'));
      prevStartAt.current = startAt;
    }

    if (prevFinishedAt.current !== finishedAt) {
      updateFields.finishedAt = Timestamp.fromDate(new Date(finishedAt + 'T00:00:00'));
      prevFinishedAt.current = finishedAt;
    }

    if (Object.keys(updateFields).length !== 0) {
    const docRef = await findDocumentId(book.id.toString());
      await updateDoc(docRef!, updateFields);
    }
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
        className="flex max-h-[40rem] w-4xl min-w-4xl flex-col gap-6 rounded-xl bg-gray-100 p-10 inset-shadow-sm"
      >
        <div className="flex items-start gap-8">
          <img src={book.cover} alt={book.title} className="h-56 w-40" />
          <div className="relative flex w-full flex-col">
            <div className="mb-3 flex items-center gap-4">
              <div className="rounded-lg bg-gray-200 px-2 py-1 text-xs font-normal text-gray-600 inset-shadow-sm">
                {STATUS[book.status]}
              </div>
              <div className="flex items-center gap-1 text-sm text-amber-500">
            <div className="absolute -top-4 -right-4 flex items-center gap-1">
              <button
                onClick={() => {
                  if (isEditting) {
                    handleUpdate();
                  }
                  setIsEditting((status) => !status);
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
                date={startAt}
                setDate={setStartAt}
              />
              <DateField
                isEditting={isEditting}
                text="완독일"
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
              <div className="mb-2 flex items-center justify-between">
                <div>진행률</div>
                <div>{book.progress}%</div>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-gray-900"
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
    </div>
  );
};

export default BookDetailModal;
