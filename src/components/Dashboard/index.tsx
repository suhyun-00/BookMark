import { useEffect, useState } from 'react';

import ScaleLoader from 'react-spinners/ScaleLoader';

import { Book } from '@customTypes/books';

import { fetchBooks } from '@api/bookApi';

import Header from '@components/Dashboard/Header';
import View from '@components/Dashboard/View';

interface DashboardProps {
  currentMenu: string;
  isExpanded: boolean;
  setIsAddBookModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBoookDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBook: React.Dispatch<React.SetStateAction<Book>>;
}

const Dashboard = ({
  currentMenu,
  isExpanded,
  setIsAddBookModalOpen,
  setIsBoookDetailModalOpen,
  setSelectedBook,
}: DashboardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>('');
  const userId = 'test';

  useEffect(() => {
    const getBooks = async () => {
      setIsLoading(true);
      const booksData = await fetchBooks(userId);
      setAllBooks(booksData.filter((book) => book !== null));
      setIsLoading(false);
    };
    getBooks();
  }, []);

  return (
    <div
      className={`min-h-screen ${isExpanded ? 'w-[calc(100vw-5rem)]' : 'w-[calc(100vw-16rem)]'}`}
    >
      <Header setDebouncedKeyword={setDebouncedKeyword} setIsOpen={setIsAddBookModalOpen} />
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <ScaleLoader color="#101828" />
        </div>
      ) : (
        <View
          allBooks={allBooks}
          keyword={debouncedKeyword}
          currentMenu={currentMenu}
          setIsOpen={setIsBoookDetailModalOpen}
          setSelectedBook={setSelectedBook}
        />
      )}
    </div>
  );
};

export default Dashboard;
