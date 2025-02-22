import { Note } from '@customTypes/note';

import formatDate from '@utils/formatDate';

interface NoteProps {
  note: Note;
}

const Card = ({ note }: NoteProps) => {
  return (
    <div className="w-full rounded-xl p-4 hover:cursor-pointer hover:bg-gray-200 hover:inset-shadow-sm">
      <p className="mb-1 w-full text-sm text-wrap text-gray-700">{note.content}</p>
      <p className="text-right text-xs text-gray-500">
        {formatDate(note.updatedAt ? note.updatedAt : note.createdAt).replace(/-/g, '. ')}
      </p>
    </div>
  );
};

export default Card;
