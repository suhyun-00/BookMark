import type { Book } from '@customTypes/books';

import useBookFilter from '@hooks/useBookFilter';

import Card from '@components/Dashboard/Card';

interface ViewProps {
  allBooks: Book[];
  keyword: string;
  currentMenu: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBook: React.Dispatch<React.SetStateAction<Book>>;
}

const View = ({ allBooks, keyword, currentMenu, setIsOpen, setSelectedBook }: ViewProps) => {
  const filteredBooks = useBookFilter({ allBooks, keyword, currentMenu });

  return (
    <div className="mb-5 ml-4 grid grid-cols-1 gap-5 sm:mr-4 sm:ml-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {filteredBooks.map((book) => (
        <Card key={book.id} book={book} setIsOpen={setIsOpen} selected={setSelectedBook} />
      ))}
    </div>
  );
};

export default View;
