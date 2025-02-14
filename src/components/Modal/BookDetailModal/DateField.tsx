import { Timestamp } from 'firebase/firestore';
import { Calendar } from 'lucide-react';

interface DateFieldProps {
  isEditting: boolean;
  text: string;
  timestamp: Timestamp | null;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

const DateField = ({ isEditting, text, timestamp, date, setDate }: DateFieldProps) => {
  return (
    <div className="flex items-center gap-3">
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
          <div className="text-sm">
            {timestamp
              ? timestamp
                  .toDate()
                  .toLocaleDateString('ko-kr', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                  .replace(/\.$/, '')
              : '----. --. --'}
          </div>
        )}
      </div>
    </div>
  );
};

export default DateField;
