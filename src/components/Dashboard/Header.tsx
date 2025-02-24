import { useEffect, useState } from 'react';

import { Search, Plus } from 'lucide-react';

interface HeaderProps {
  setDebouncedKeyword: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setDebouncedKeyword, setIsOpen }: HeaderProps) => {
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedKeyword(keyword), 500);
    return () => clearTimeout(timeout);
  }, [keyword, setDebouncedKeyword]);

  return (
    <div className="m-4 mr-0 flex items-center justify-end sm:mr-4 sm:justify-between">
      <h2 className="hidden p-2 font-medium sm:block sm:p-5 sm:text-2xl">내 서재</h2>
      <div className="flex items-center gap-3">
        <div className="flex w-64 items-center justify-center rounded-lg bg-white inset-shadow-sm">
          <span className="hidden sm:visible">
            <Search className="ml-5 h-3 w-3" />
          </span>
          <input
            type="search"
            value={keyword}
            placeholder="책 검색하기"
            autoComplete="off"
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full px-3 py-2.5 text-sm text-gray-500 focus:outline-none"
          />
        </div>
        <button
          onClick={() => {
            setIsOpen((isOpen) => !isOpen);
          }}
          className="flex h-10 items-center gap-3 rounded-lg bg-gray-900 px-4 text-sm text-white hover:cursor-pointer hover:bg-neutral-700"
        >
          <span className="hidden sm:visible">
            <Plus className="h-4 w-4" />
          </span>
          책 등록
        </button>
      </div>
    </div>
  );
};

export default Header;
