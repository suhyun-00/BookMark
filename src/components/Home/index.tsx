import SideBar from '@components/SideBar';
import Dashboard from '@components/Dashboard';
import AddBookModal from '../Modal/AddBookModal';
import { useState } from 'react';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="whitespace-nowrap text-gray-900">
      <div className="flex min-h-screen bg-gray-100/60 backdrop-blur-xl">
        <SideBar />
        <Dashboard setIsOpen={setIsOpen} />
      </div>
      <AddBookModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Home;
