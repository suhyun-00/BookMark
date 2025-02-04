import { useEffect, useState } from "react";
import type { Data } from "@customTypes/data";
import SearchBar from "@components/common/SearchBar";
import Card from "@components/Modal/Card";

const SearchView = () => {
  const [datas, setDatas] = useState<Data[]>();

  useEffect(() => {}, [datas]);

  return (
    <div>
      <form
        className="flex items-start justify-center gap-3"
      >
        <SearchBar
          name="keyword"
          className="w-full justify-start"
          placeholder="책 제목, 저자, ISBN으로 검색하기"
        />
        <button
          type="submit"
          className="w-30 rounded-lg bg-gray-900 px-5 py-2 text-sm text-white hover:cursor-pointer hover:bg-neutral-700"
        >
          검색
        </button>
      </form>
      {datas && (
        <div className="mt-6 max-h-72 overflow-y-scroll scroll-smooth">
          {datas.map((book) => (
            <Card book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchView;
