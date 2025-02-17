import { useState } from 'react';

interface DrawStarProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

const DrawStar = ({ rating, setRating }: DrawStarProps) => {
  const [width, setWidth] = useState<string>(`${rating * 20}%`);

  const calculateWidth = (value: number) => {
    setRating(value);
    setWidth(`${value * 20}%`);
  };

  return (
    <span className="relative text-lg text-gray-200">
      ★★★★★
      <span
        style={{ width: width }}
        className="pointer-events-none absolute left-0 w-0 overflow-hidden text-amber-500"
      >
        ★★★★★
      </span>
      <input
        type="range"
        onChange={(e) => calculateWidth(parseFloat(e.target.value))}
        value={rating}
        step="0.5"
        min="0"
        max="5"
        className="absolute left-0 h-full w-full opacity-0"
      />
    </span>
  );
};

export default DrawStar;
