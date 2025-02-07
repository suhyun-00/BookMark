import { doc, collection, setDoc, addDoc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { Plus } from 'lucide-react';
import type { Data } from '@customTypes/data';
import db from '@/fireabase';

const API_BASE_URL = import.meta.env.DEV ? '/aladinApi' : import.meta.env.VITE_SERVER_URL;

const Card = ({ book }: { book: Data }) => {
  const addBook = async () => {
    const booksRef = await getDoc(doc(db, 'books', book.isbn));
    const condition = query(
      collection(db, 'userBooks'),
      where('userId', '==', 'test'),
      where('bookId', '==', book.isbn),
    );
    const userBooksSanpshot = await getDocs(condition);

    if (!booksRef.exists()) {
      const response = await fetch(`${API_BASE_URL}/search/${book.isbn}`);
      const { page, description, categoryName } = await response.json();

      await setDoc(doc(db, 'books', book.isbn), {
        title: book.title,
        author: book.author,
        cover: book.image,
        publisher: book.publisher,
        pubDate: book.pubdate,
        page: page,
        description: description,
        category: categoryName.split('>'),
      });
    }

    if (userBooksSanpshot.docs.length === 0) {
      await addDoc(collection(db, 'userBooks'), {
        userId: 'test',
        bookId: book.isbn,
        status: 'wishlist',
        currentPage: 0,
        startAt: null,
        finishedAt: null,
        rating: 0,
        notes: [],
      });
    }
  };

  return (
    <div className="flex items-start gap-6 rounded-lg p-4 text-sm hover:bg-gray-200">
      <img src={book.image} alt={book.title} className="h-28 w-20 rounded-md shadow-sm" />
      <div className="flex h-28 w-full justify-between">
        <div className="flex max-w-76 flex-col">
          <div className="mb-1 truncate text-lg font-medium">{book.title}</div>
          <div className="mb-2 truncate text-sm text-gray-700">{book.author}</div>
          <div className="truncate text-sm font-light text-gray-500">
            {book.publisher} ⋅ {book.pubdate.slice(0, 4)}
          </div>
        </div>
        <button
          onClick={addBook}
          className="my-auto flex items-center justify-center gap-3 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:cursor-pointer hover:bg-neutral-700"
        >
          <Plus className="h-3 w-3" />
          등록
        </button>
      </div>
    </div>
  );
};

export default Card;
