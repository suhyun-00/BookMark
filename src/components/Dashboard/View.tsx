import { useEffect, useState } from 'react';
import type { Book } from '@customTypes/books';
import Card from '@components/Dashboard/Card';
import { fetchBooks } from '@api/bookApi';

interface ViewProps {
  currentMenu: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBook: React.Dispatch<React.SetStateAction<Book>>;
}

const View = ({ currentMenu, setIsOpen, setSelectedBook }: ViewProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const userId = 'test';

  useEffect(() => {
    const getBooks = async () => {
      const booksData = await fetchBooks({ userId });

      if (currentMenu === 'all') {
        setBooks(booksData.filter((book) => book !== null));
      } else {
        setBooks(
          booksData.filter((book) => book !== null).filter((book) => book.status === currentMenu),
        );
      }
    };

    getBooks();
  }, [currentMenu]);

  return (
    <div className="mr-4 ml-9 grid grid-cols-2 grid-rows-3 gap-5">
      {books.map((book) => (
        <Card key={book.id} book={book} setIsOpen={setIsOpen} selected={setSelectedBook} />
      ))}
    </div>
  );
};

export default View;
