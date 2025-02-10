import { useState } from 'react';
import SideBar from '@components/SideBar';
import Dashboard from '@components/Dashboard';
import AddBookModal from '@components/Modal/AddBookModal/AddBookModal';
import BookDetailModal from '@components/Modal/BookDetailModal/BookDetailModal';
import type { Book } from '@customTypes/books';
import DEFAULT_BOOK from '@constants/DEFAULT_BOOK';

const Home = () => {
  const [currentMenu, setCurrentMenu] = useState('all');
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isBookDetailModalOpen, setIsBoookDetailModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book>(DEFAULT_BOOK);

  return (
    <div className="whitespace-nowrap text-gray-900">
      <div className="flex min-h-screen bg-gray-100/60 backdrop-blur-xl">
        <SideBar currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />
        <Dashboard
          currentMenu={currentMenu}
          setIsAddBookModalOpen={setIsAddBookModalOpen}
          setIsBoookDetailModalOpen={setIsBoookDetailModalOpen}
          setSelectedBook={setSelectedBook}
        />
      </div>
      <AddBookModal isOpen={isAddBookModalOpen} onClose={() => setIsAddBookModalOpen(false)} />
      <BookDetailModal
        isOpen={isBookDetailModalOpen}
        onClose={() => setIsBoookDetailModalOpen(false)}
        book={selectedBook}
      />
    </div>
  );
};

export default Home;
