import { useState } from 'react';
import SideBar from '@components/SideBar';
import Dashboard from '@components/Dashboard';
import AddBookModal from '@components/Modal/AddBookModal/AddBookModal';
import BookDetailModal from '@components/Modal/BookDetailModal/BookDetailModal';
import { Book } from '@customTypes/books';

const defaultBook: Book = {
  id: 0,
  title: '',
  author: '',
  cover: '',
  progress: 0,
  startAt: null,
  finishedAt: null,
  rating: 0,
  status: 'wishlist',
};

const Home = () => {
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isBookDetailModalOpen, setIsBoookDetailModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book>(defaultBook);

  return (
    <div className="whitespace-nowrap text-gray-900">
      <div className="flex min-h-screen bg-gray-100/60 backdrop-blur-xl">
        <SideBar />
        <Dashboard
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
