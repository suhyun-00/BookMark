import Card from "@components/Dashboard/Card";
import books from "@mocks/books";

const View = () => {
  return (
    <div className="mr-4 ml-9 grid grid-cols-2 grid-rows-3 gap-5">
      {books.map((book) => (
        <Card key={book.id} book={book} />
      ))}
    </div>
  );
};

export default View;
