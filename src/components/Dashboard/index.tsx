import { useState } from 'react';

import ScaleLoader from 'react-spinners/ScaleLoader';

import { Book } from '@customTypes/books';

import Header from '@components/Dashboard/Header';
import View from '@components/Dashboard/View';

interface DashboardProps {
  currentMenu: string;
  isExpanded: boolean;
  isLoading: boolean;
  allBooks: Book[];
  setIsAddBookModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBoookDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBook: React.Dispatch<React.SetStateAction<Book>>;
}

const Dashboard = ({
  currentMenu,
  isExpanded,
  isLoading,
  allBooks,
  setIsAddBookModalOpen,
  setIsBoookDetailModalOpen,
  setSelectedBook,
}: DashboardProps) => {
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>('');

  return (
    <main
      className={`min-h-screen ${isExpanded ? 'w-[calc(100vw-16rem)]' : 'w-[calc(100vw-5rem)]'}`}
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
    </main>
  );
};

export default Dashboard;
