import { useState, useEffect } from 'react';

import { Book } from '@customTypes/books';

import { fetchBooks } from '@api/bookApi';

const useGetBooks = (userId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  useEffect(() => {
    const getBooks = async () => {
      setIsLoading(true);
      const booksData = await fetchBooks(userId);
      setAllBooks(booksData.filter((book) => book !== null));
      setIsLoading(false);
    };
    getBooks();
  }, [userId]);

  return { isLoading, allBooks };
};

export default useGetBooks;
