import { useEffect, useState } from 'react';
import { doc, collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { Book, BookStatusType } from '@customTypes/books';
import db from '@/fireabase';
import Card from '@components/Dashboard/Card';

interface ViewProps {
  currentMenu: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBook: React.Dispatch<React.SetStateAction<Book>>;
}

const View = ({ currentMenu, setIsOpen, setSelectedBook }: ViewProps) => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    const condition = query(collection(db, 'userBooks'), where('userId', '==', 'test'));
    const querySnapshot = await getDocs(condition);

    const booksData: (Book | null)[] = await Promise.all(
      querySnapshot.docs.map(async (document) => {
        const data = document.data();
        const bookRef = doc(db, 'books', data.bookId);
        const bookSnap = await getDoc(bookRef);

        if (!bookSnap.exists()) return null;
        const bookData = bookSnap.data();

        return {
          id: data.bookId,
          title: bookData.title,
          author: bookData.author,
          cover: bookData.cover,
          progress: Math.floor((data.currentPage / bookData.page) * 100),
          startAt: data.startAt,
          finishedAt: data.finishedAt,
          rating: data.rating,
          status: data.status as BookStatusType,
        };
      }),
    );
    if (currentMenu === 'all') {
      setBooks(booksData.filter((book) => book !== null));
    } else {
      setBooks(
        booksData.filter((book) => book !== null).filter((book) => book.status === currentMenu),
      );
    }
  };

  useEffect(() => {
    fetchBooks();
  });

  return (
    <div className="mr-4 ml-9 grid grid-cols-2 grid-rows-3 gap-5">
      {books.map((book) => (
        <Card key={book.id} book={book} setIsOpen={setIsOpen} selected={setSelectedBook} />
      ))}
    </div>
  );
};

export default View;
