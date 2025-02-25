import { Timestamp } from 'firebase/firestore';
import { Calendar } from 'lucide-react';

interface DateFieldProps {
  isEditting: boolean;
  text: string;
  timestamp?: Timestamp | null;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

const DateField = ({ isEditting, text, timestamp, date, setDate }: DateFieldProps) => {
  return (
    <div className={`flex items-center gap-3 ${isEditting ? 'text-blue-500' : ''}`}>
      <Calendar className="h-4 w-4" />
      <div className="flex w-[68vw] items-center justify-between gap-3 sm:w-fit sm:flex-col sm:items-start sm:gap-0">
        <div className="text-sm sm:text-xs">{text}</div>
        {isEditting ? (
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-[25vw] border-b border-blue-500 px-2 text-right text-sm focus:outline-none sm:w-fit sm:border-none"
          />
        ) : (
          <div className="text-sm">
            {timestamp
              ? new Date(
                  timestamp.toDate().getTime() - timestamp.toDate().getTimezoneOffset() * 60000,
                )
                  .toISOString()
                  .split('T')[0]
                  .split('-')
                  .join('. ')
              : '----. --. --'}
          </div>
        )}
      </div>
    </div>
  );
};

export default DateField;
