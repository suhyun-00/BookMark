import { Search, Plus } from 'lucide-react';

interface HeaderProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ keyword, setKeyword, setIsOpen }: HeaderProps) => {
  return (
    <div className="m-4 flex items-center justify-between">
      <h2 className="p-5 text-2xl font-medium">내 서재</h2>
      <div className="flex items-center gap-3">
        <div className="flex w-64 items-center justify-center rounded-lg bg-white inset-shadow-sm">
          <Search className="ml-5 h-3 w-3" />
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
          <Plus className="h-4 w-4" />책 등록
        </button>
      </div>
    </div>
  );
};

export default Header;
