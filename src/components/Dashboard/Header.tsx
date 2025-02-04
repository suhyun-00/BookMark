import SearchBar from "@components/common/SearchBar";
import { Plus } from "lucide-react";

interface HeaderProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setIsOpen }: HeaderProps) => {
  return (
    <div className="m-4 flex items-center justify-between">
      <h2 className="p-5 text-2xl font-medium">내 서재</h2>
      <div className="flex items-center gap-3">
        <SearchBar className="w-64" placeholder="책 검색하기" />
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
