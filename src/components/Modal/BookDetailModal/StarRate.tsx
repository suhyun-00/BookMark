import { useState } from 'react';

import Star from '@components/Modal/BookDetailModal/Star';

interface DrawStarProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

const StarRate = ({ rating, setRating }: DrawStarProps) => {
  const [width, setWidth] = useState<string>(`${rating * 20}%`);

  const calculateWidth = (value: number) => {
    setRating(value);
    setWidth(`${value * 20}%`);
  };

  return (
    <span aria-hidden="true" className="relative flex text-gray-200">
      {[...Array(5)].map((_, idx) => (
        <Star idx={idx} width={20} height={20} />
      ))}
      <div
        aria-hidden="true"
        style={{ width }}
        className="absolute left-0 flex w-0 overflow-hidden text-amber-500"
      >
        {[...Array(5)].map((_, idx) => (
          <Star idx={idx} width={20} height={20} />
        ))}
      </div>
      <input
        type="range"
        value={rating}
        step="0.5"
        min="0"
        max="5"
        aria-label="별점 슬라이더"
        onChange={(e) => calculateWidth(parseFloat(e.target.value))}
        className="absolute left-0 h-full w-full cursor-pointer opacity-0"
      />
    </span>
  );
};

export default StarRate;
