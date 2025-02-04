import SearchBar from "@components/common/SearchBar";
import { Plus } from "lucide-react";

const Header = () => {
  return (
    <div className="m-4 flex items-center justify-between whitespace-nowrap">
      <h2 className="p-5 text-2xl font-medium text-gray-900">내 서재</h2>
      <div className="flex items-center gap-3">
        <SearchBar className="w-64" placeholder="책 검색하기" />
        <button className="flex h-10 items-center gap-3 rounded-lg bg-gray-900 px-4 text-sm text-white hover:cursor-pointer hover:bg-neutral-700">
          <Plus className="h-4 w-4" />책 등록
        </button>
      </div>
    </div>
  );
};

export default Header;
