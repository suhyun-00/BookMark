import { useState } from 'react';
import { Search } from 'lucide-react';
import type { Data } from '@customTypes/data';
import Card from '@components/Modal/AddBookModal/Card';

const API_BASE_URL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_NAVER_API_URL;

const SearchView = () => {
  const [datas, setDatas] = useState<Data[]>();

  const sendFormData = async (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const keyword = formData.get('keyword');

    const response = await fetch(`${API_BASE_URL}/search/${keyword}`);
    const data = await response.json();
    setDatas(data);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const form = event.currentTarget;
      sendFormData(form);
    }
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendFormData(event.currentTarget);
  };

  return (
    <div>
      <form
        onSubmit={handleOnSubmit}
        onKeyDown={handleOnKeyDown}
        className="flex items-start justify-center gap-3"
      >
        <div className="flex w-full items-center justify-start rounded-lg bg-white inset-shadow-sm">
          <Search className="ml-5 h-3 w-3" />
          <input
            type="search"
            name="keyword"
            placeholder="책 제목, 저자, ISBN으로 검색하기"
            autoComplete="off"
            className="w-full px-3 py-2.5 text-sm text-gray-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-30 rounded-lg bg-gray-900 px-5 py-2 text-sm text-white hover:cursor-pointer hover:bg-neutral-700"
        >
          검색
        </button>
      </form>
      {datas && (
        <div className="scrollbar mt-6 max-h-72 overflow-y-scroll scroll-smooth">
          {datas.map((book) => (
            <Card book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchView;
