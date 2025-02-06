import { useEffect, useState } from 'react';
import { doc, collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { Book, BookStatusType } from '@customTypes/books';
import db from '@/fireabase';
import Card from '@components/Dashboard/Card';
// import books from '@mocks/books';

const View = () => {
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
          id: bookData.id,
          title: bookData.title,
          author: bookData.author,
          cover: bookData.cover,
          progress: (data.currentPage / bookData.page) * 100,
          rating: data.rating,
          status: data.status as BookStatusType,
        };
      }),
    );
    setBooks(booksData.filter((book) => book !== null));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="mr-4 ml-9 grid grid-cols-2 grid-rows-3 gap-5">
      {books.map((book) => (
        <Card key={book.id} book={book} />
      ))}
    </div>
  );
};

export default View;
