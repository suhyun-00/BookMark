import { useState, useEffect } from 'react';

import type { Book } from '@customTypes/books';

interface useBoookFilterProps {
  allBooks: Book[];
  keyword: string;
  currentMenu: string;
}

const useBookFilter = ({ allBooks, keyword, currentMenu }: useBoookFilterProps) => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    let result =
      currentMenu === 'all' ? allBooks : allBooks.filter((book) => book.status === currentMenu);

    if (keyword) {
      const formattedKeyword = keyword.replace(/\s/g, '').toLowerCase();

      result = result.filter(
        (book) =>
          book.title.replace(/\s/g, '').toLowerCase().includes(formattedKeyword) ||
          book.author.replace(/\s/g, '').toLowerCase().includes(formattedKeyword),
      );
    }
    setFilteredBooks(result);
  }, [allBooks, keyword, currentMenu]);

  return filteredBooks;
};

export default useBookFilter;
