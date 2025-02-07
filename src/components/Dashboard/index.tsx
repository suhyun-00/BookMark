import Header from '@components/Dashboard/Header';
import View from '@components/Dashboard/View';
import { Book } from '@customTypes/books';

interface DashboardProps {
  setIsAddBookModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBoookDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBook: React.Dispatch<React.SetStateAction<Book>>;
}

const Dashboard = ({
  setIsAddBookModalOpen,
  setIsBoookDetailModalOpen,
  setSelectedBook,
}: DashboardProps) => {
  return (
    <div className="ml-64 min-h-screen w-screen">
      <Header setIsOpen={setIsAddBookModalOpen} />
      <View setIsOpen={setIsBoookDetailModalOpen} setSelectedBook={setSelectedBook} />
    </div>
  );
};

export default Dashboard;
