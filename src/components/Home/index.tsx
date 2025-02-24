import { useState } from 'react';

import DEFAULT_BOOK from '@constants/DEFAULT_BOOK';
import type { Book } from '@customTypes/books';

import { updateBook } from '@api/bookApi';

import Dashboard from '@components/Dashboard';
import AddBookModal from '@components/Modal/AddBookModal';
import BookDetailModal from '@components/Modal/BookDetailModal';
import Sidebar from '@components/Sidebar';

const Home = () => {
  const [currentMenu, setCurrentMenu] = useState('all');
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isBookDetailModalOpen, setIsBoookDetailModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book>(DEFAULT_BOOK);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleBookUpdate = async () => {
    const updatedBook = await updateBook(selectedBook.id.toString());
    setSelectedBook(updatedBook!);
  };

  return (
    <div className="whitespace-nowrap text-gray-900">
      <div className="flex min-h-screen bg-gray-100/60 backdrop-blur-xl">
        <Sidebar
          currentMenu={currentMenu}
          isExpanded={isExpanded}
          setCurrentMenu={setCurrentMenu}
          setIsExpanded={setIsExpanded}
        />
        <Dashboard
          currentMenu={currentMenu}
          isExpanded={isExpanded}
          setIsAddBookModalOpen={setIsAddBookModalOpen}
          setIsBoookDetailModalOpen={setIsBoookDetailModalOpen}
          setSelectedBook={setSelectedBook}
        />
      </div>
      {isAddBookModalOpen && <AddBookModal onClose={() => setIsAddBookModalOpen(false)} />}
      {isBookDetailModalOpen && (
        <BookDetailModal
          onClose={() => setIsBoookDetailModalOpen(false)}
          book={selectedBook}
          handleBookUpdate={handleBookUpdate}
        />
      )}
    </div>
  );
};

export default Home;
