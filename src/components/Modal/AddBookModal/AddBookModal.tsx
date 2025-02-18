import { useState } from 'react';
import { Scan, Search } from 'lucide-react';
import SearchView from '@components/Modal/AddBookModal/SearchView';
import BarcodeView from './BarcodeView';

interface AddBookModalProps {
  onClose: () => void;
}

const AddBookModal = ({ onClose }: AddBookModalProps) => {
  const [selectedButton, setSelectedButton] = useState('search');

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-gray-900/20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[40rem] rounded-xl bg-gray-100 p-10 inset-shadow-sm"
      >
        <div className="mb-6 flex items-center justify-center gap-3">
          <button
            value="search"
            onClick={() => setSelectedButton('search')}
            className={`flex items-center justify-center gap-5 rounded-lg px-20 py-2 text-sm ${selectedButton === 'search' ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-200'} hover:cursor-pointer hover:inset-shadow-sm`}
          >
            <Search className="h-4 w-4" />
            검색으로 추가
          </button>
          <button
            value="barcode"
            onClick={() => setSelectedButton('barcode')}
            className={`flex items-center justify-center gap-5 rounded-lg px-20 py-2 text-sm ${selectedButton === 'barcode' ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-200'} hover:cursor-pointer hover:inset-shadow-sm`}
          >
            <Scan className="h-4 w-4" />
            바코드로 추가
          </button>
        </div>
        {selectedButton === 'search' && <SearchView onClose={onClose} />}
        {selectedButton === 'barcode' && <BarcodeView onClose={onClose} />}
      </div>
    </div>
  );
};

export default AddBookModal;
