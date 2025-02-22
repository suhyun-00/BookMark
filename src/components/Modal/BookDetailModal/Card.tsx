import { Note } from '@customTypes/note';

import formatDate from '@utils/formatDate';

interface NoteProps {
  note: Note;
}

const Card = ({ note }: NoteProps) => {
  return (
    <div className="w-full cursor-pointer rounded-xl bg-gray-200/80 p-4 inset-shadow-sm">
      <p className="mb-1 w-full text-sm text-wrap text-gray-700">{note.content}</p>
      <p className="text-right text-xs text-gray-500">{formatDate(note.updatedAt)}</p>
    </div>
  );
};

export default Card;
