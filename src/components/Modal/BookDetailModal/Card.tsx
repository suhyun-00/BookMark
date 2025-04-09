import { Note } from '@customTypes/note';

import formatDate from '@utils/formatDate';

interface NoteProps {
  note: Note;
  onClick: () => void;
}

const Card = ({ note, onClick }: NoteProps) => {
  return (
    <li
      onClick={onClick}
      className="cursor-pointer rounded-xl bg-gray-200/80 p-4 inset-shadow-sm hover:cursor-pointer hover:bg-gray-300/80"
    >
      <p className="mb-1 w-full text-sm text-wrap text-gray-700">{note.content}</p>
      <p className="text-right text-xs text-gray-500">{formatDate(note.updatedAt)}</p>
    </li>
  );
};

export default Card;
