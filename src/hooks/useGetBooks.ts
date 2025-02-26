import { useState, useEffect, useCallback } from 'react';

import { Book } from '@customTypes/books';

import { fetchBooks } from '@api/bookApi';

const useGetBooks = (userId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  const getBooks = useCallback(async () => {
    setIsLoading(true);
    const booksData = await fetchBooks(userId);
    setAllBooks(booksData.filter((book) => book !== null));
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return { isLoading, allBooks, getBooks };
};

export default useGetBooks;
