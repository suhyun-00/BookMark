import { useEffect, useState } from 'react';

import DEFAULT_BOOK from '@constants/DEFAULT_BOOK';
import type { Book } from '@customTypes/books';

import { updateBook } from '@api/bookApi';

import useGetBooks from '@hooks/useGetBooks';

import Dashboard from '@components/Dashboard';
import AddBookModal from '@components/Modal/AddBookModal';
import BookDetailModal from '@components/Modal/BookDetailModal';
import Sidebar from '@components/Sidebar';

const BREAKPOINT_SM_REM = 67;

const Home = () => {
  const [currentMenu, setCurrentMenu] = useState('all');
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isBookDetailModalOpen, setIsBoookDetailModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book>(DEFAULT_BOOK);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const userId = 'test';

  const { isLoading, allBooks, getBooks } = useGetBooks(userId);

  const handleBookUpdate = async () => {
    const updatedBook = await updateBook(selectedBook.id.toString());
    if (updatedBook) {
      setSelectedBook(updatedBook);
      await getBooks();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsExpanded(window.innerWidth >= BREAKPOINT_SM_REM * 16);
      setIsClosed(window.innerWidth < BREAKPOINT_SM_REM * 16);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="whitespace-nowrap text-gray-900">
      <div className="flex min-h-screen bg-gray-100/60 backdrop-blur-xl">
        <Sidebar
          currentMenu={currentMenu}
          isExpanded={isExpanded}
          isClosed={isClosed}
          setCurrentMenu={setCurrentMenu}
          setIsExpanded={setIsExpanded}
          setIsClosed={setIsClosed}
        />
        <Dashboard
          currentMenu={currentMenu}
          isExpanded={isExpanded}
          isLoading={isLoading}
          allBooks={allBooks}
          setIsAddBookModalOpen={setIsAddBookModalOpen}
          setIsBoookDetailModalOpen={setIsBoookDetailModalOpen}
          setSelectedBook={setSelectedBook}
        />
      </div>
      {isAddBookModalOpen && (
        <AddBookModal
          onClose={() => {
            setIsAddBookModalOpen(false);
            document.querySelector<HTMLElement>('#addBook')?.focus();
          }}
          getBooks={getBooks}
        />
      )}
      {isBookDetailModalOpen && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setIsBoookDetailModalOpen(false)}
          handleBookUpdate={handleBookUpdate}
          getBooks={getBooks}
        />
      )}
    </div>
  );
};

export default Home;
