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
    <div className="mr-4 ml-9 grid grid-cols-2 grid-rows-3 gap-5">
      {filteredBooks.map((book) => (
        <Card key={book.id} book={book} setIsOpen={setIsOpen} selected={setSelectedBook} />
      ))}
    </div>
  );
};

export default View;
