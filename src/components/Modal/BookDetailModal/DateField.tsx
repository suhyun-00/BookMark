import { Calendar } from 'lucide-react';

interface DateFieldProps {
  isEditting: boolean;
  text: string;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

const DateField = ({ isEditting, text, date, setDate }: DateFieldProps) => {
  return (
    <div className={`flex items-center gap-3 ${isEditting ? 'text-blue-500' : ''}`}>
      <Calendar className="h-4 w-4" />
      <div className="flex flex-col">
        <div className="text-xs">{text}</div>
        {isEditting ? (
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="text-sm focus:outline-none"
          />
        ) : (
          <div className="text-sm">{date ? date.split('-').join('. ') : '----. --. --'}</div>
        )}
      </div>
    </div>
  );
};

export default DateField;
