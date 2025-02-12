import { Search } from 'lucide-react';

interface SearchBarProps {
  name?: string;
  className?: string;
  placeholder: string;
}

const SearchBar = ({ name, className, placeholder }: SearchBarProps) => {
  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-white inset-shadow-sm ${className}`}
    >
      <Search className="ml-5 h-3 w-3" />
      <input
        type="search"
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full px-3 py-2.5 text-sm text-gray-500 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
