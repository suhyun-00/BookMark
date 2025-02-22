import { useRef, useState } from 'react';

import { X } from 'lucide-react';

import { Note } from '@customTypes/note';

import { addNote, updateNote } from '@api/noteApi';

import { handleOnKeyDown, handleOnSubmit } from '@utils/handleFormData';

interface AddNoteModalProps {
  userBookId: string;
  selectedNote?: Note;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedNote: React.Dispatch<React.SetStateAction<Note | undefined>>;
}

const NoteModal = ({
  userBookId,
  selectedNote,
  setIsOpen,
  setIsLoading,
  setSelectedNote,
}: AddNoteModalProps) => {
  const selectedNoteId = useRef<string>(selectedNote ? selectedNote.id : '');
  const selectedNoteContent = useRef<string>(selectedNote ? selectedNote.content : '');
  const [content, setContet] = useState<string>(selectedNoteContent.current);

  const handleClose = () => {
    setSelectedNote(undefined);
    setIsOpen(false);
  };

  const handleNote = async (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const content = formData.get('content');

    const userId = 'test';

    if (content) {
      setIsLoading(true);
      if (selectedNoteId.current) {
        await updateNote(selectedNoteId.current, content.toString());
      } else {
        await addNote(userId, userBookId, content.toString());
      }
      setIsLoading(false);
    }
    setIsOpen(false);
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 flex items-center justify-center bg-gray-900/20"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleOnSubmit(e, handleNote)}
        onKeyDown={(e) => handleOnKeyDown(e, handleNote)}
        className="flex h-72 w-96 flex-col items-center justify-center gap-4 rounded-2xl bg-gray-100 px-8 py-4"
      >
        <div className="relative w-full">
          <div className="text-lg font-medium text-gray-700">
            {selectedNote ? '독서 노트 수정' : '새 독서 노트'}
          </div>
          <button onClick={handleClose} className="absolute top-0 -right-4 hover:cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>
        <textarea
          required
          autoFocus
          name="content"
          placeholder="노트를 입력하세요."
          value={content}
          onChange={(e) => setContet(e.target.value)}
          className="scrollbar h-40 w-full resize-none scroll-smooth rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-500 inset-shadow-sm focus:outline-none"
        ></textarea>
        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-lg bg-gray-200 px-4 py-1 text-blue-500 hover:cursor-pointer hover:text-blue-700 hover:inset-shadow-sm"
          >
            {selectedNote ? '수정' : '등록'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteModal;
