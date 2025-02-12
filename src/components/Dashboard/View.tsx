import { useEffect, useState } from 'react';
import type { Book } from '@customTypes/books';
import Card from '@components/Dashboard/Card';

interface ViewProps {
  allBooks: Book[];
  keyword: string;
  currentMenu: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBook: React.Dispatch<React.SetStateAction<Book>>;
}

const View = ({ allBooks, keyword, currentMenu, setIsOpen, setSelectedBook }: ViewProps) => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    const filterBooks = async () => {
      if (currentMenu === 'all') {
        setFilteredBooks(allBooks);
      } else {
        setFilteredBooks(allBooks.filter((book) => book.status === currentMenu));
      }

      if (keyword !== '') {
        setFilteredBooks((books) =>
          books.filter((book) => book.author.includes(keyword) || book.title.includes(keyword)),
        );
      }
    };

    filterBooks();
  }, [allBooks, keyword, currentMenu]);

  return (
    <div className="mr-4 ml-9 grid grid-cols-2 grid-rows-3 gap-5">
      {filteredBooks.map((book) => (
        <Card key={book.id} book={book} setIsOpen={setIsOpen} selected={setSelectedBook} />
      ))}
    </div>
  );
};

export default View;
