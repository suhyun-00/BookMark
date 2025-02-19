import { useEffect, useState } from 'react';
import { fetchBooks } from '@/api/bookApi';
import Header from '@components/Dashboard/Header';
import View from '@components/Dashboard/View';
import { Book } from '@customTypes/books';

interface DashboardProps {
  currentMenu: string;
  setIsAddBookModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBoookDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBook: React.Dispatch<React.SetStateAction<Book>>;
}

const Dashboard = ({
  currentMenu,
  setIsAddBookModalOpen,
  setIsBoookDetailModalOpen,
  setSelectedBook,
}: DashboardProps) => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>('');
  const userId = 'test';

  useEffect(() => {
    const getBooks = async () => {
      const booksData = await fetchBooks(userId);
      setAllBooks(booksData.filter((book) => book !== null));
    };
    getBooks();
  }, []);

  return (
    <div className="ml-64 min-h-screen w-screen">
      <Header setDebouncedKeyword={setDebouncedKeyword} setIsOpen={setIsAddBookModalOpen} />
      <View
        allBooks={allBooks}
        keyword={debouncedKeyword}
        currentMenu={currentMenu}
        setIsOpen={setIsBoookDetailModalOpen}
        setSelectedBook={setSelectedBook}
      />
    </div>
  );
};

export default Dashboard;
