import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center justify-center rounded-xl bg-white inset-shadow-sm">
      <Search className="ml-5 h-3 w-3" />
      <input
        type="text"
        placeholder="책 검색하기"
        className="w-64 px-3 py-2.5 text-sm text-gray-500 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
