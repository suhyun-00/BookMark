import { useRef, useState } from 'react';

import { Scan, Search } from 'lucide-react';

import BarcodeView from '@components/Modal/AddBookModal/BarcodeView';
import SearchView from '@components/Modal/AddBookModal/SearchView';

interface AddBookModalProps {
  onClose: () => void;
  getBooks: () => Promise<void>;
}

const AddBookModal = ({ onClose, getBooks }: AddBookModalProps) => {
  const [selectedButton, setSelectedButton] = useState('search');
  const userCamera = useRef<MediaStream>();

  const checkCamera = async () => {
    const camera = await navigator?.mediaDevices
      ?.getUserMedia({ video: true })
      .catch(() => console.log('camera unavailable'));

    if (camera) userCamera.current = camera;
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-gray-900/20"
    >
      <div
aria-label="등록할 책 검색"
        tabIndex={0}
        onClick={(e) => e.stopPropagation()}
        className="w-[90vw] rounded-xl bg-gray-100 p-5 inset-shadow-sm sm:w-[40rem] sm:p-10"
      >
        <div className="mb-6 flex items-center justify-center gap-3">
          <button
            value="search"
            onClick={() => setSelectedButton('search')}
            className={`flex w-[40vw] items-center justify-center gap-5 rounded-lg px-4 py-2 text-sm sm:px-20 ${selectedButton === 'search' ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-200'} hover:cursor-pointer hover:inset-shadow-sm`}
          >
            <Search className="h-4 w-4" />
            검색으로 추가
          </button>
          <button
            value="barcode"
            onClick={async () => {
              await checkCamera();
              setSelectedButton('barcode');
            }}
            className={`flex w-[40vw] items-center justify-center gap-5 rounded-lg px-4 py-2 text-sm sm:px-20 ${selectedButton === 'barcode' ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-200'} hover:cursor-pointer hover:inset-shadow-sm`}
          >
            <Scan className="h-4 w-4" />
            바코드로 추가
          </button>
        </div>
        {selectedButton === 'search' && <SearchView onClose={onClose} getBooks={getBooks} />}
        {selectedButton === 'barcode' && (
          <BarcodeView onClose={onClose} camera={userCamera.current} getBooks={getBooks} />
        )}
      </div>
    </div>
  );
};

export default AddBookModal;
