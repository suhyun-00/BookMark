import { useState } from 'react';

import DEFAULT_BOOK from '@constants/DEFAULT_BOOK';
import type { Book, BookStatusType } from '@customTypes/books';

import { fetchBook, fetchUserBook } from '@api/bookApi';

import Dashboard from '@components/Dashboard';
import AddBookModal from '@components/Modal/AddBookModal';
import BookDetailModal from '@components/Modal/BookDetailModal';
import SideBar from '@components/SideBar';

const Home = () => {
  const [currentMenu, setCurrentMenu] = useState('all');
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isBookDetailModalOpen, setIsBoookDetailModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book>(DEFAULT_BOOK);

  const handleBookUpdate = async () => {
    const bookSnap = await fetchBook(selectedBook.id.toString());
    const { docSnap } = await fetchUserBook(selectedBook.id.toString());

    if (bookSnap.exists() && docSnap.exists()) {
      const bookData = bookSnap.data();
      const userData = docSnap.data();

      const updatedBook: Book = {
        id: selectedBook.id,
        title: bookData.title,
        author: bookData.author,
        cover: bookData.cover,
        progress: Math.floor((userData.currentPage / bookData.page) * 100),
        startAt: userData.startAt,
        finishedAt: userData.finishedAt,
        rating: userData.rating,
        status: userData.status as BookStatusType,
      };

      setSelectedBook(updatedBook);
    }
  };

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
