import { addNote } from '@api/noteApi';

import { handleOnKeyDown, handleOnSubmit } from '@utils/handleFormData';

interface AddNoteModalProps {
  userBookId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const NoteModal = ({ userBookId, setIsOpen, setIsLoading }: AddNoteModalProps) => {
  const handleAddNote = async (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const content = formData.get('content');

    const userId = 'test';

    setIsLoading(true);
    if (content) await addNote(userId, userBookId, content.toString());
    setIsLoading(false);

    setIsOpen(false);
  };

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 flex items-center justify-center bg-gray-900/20"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleOnSubmit(e, handleAddNote)}
        onKeyDown={(e) => handleOnKeyDown(e, handleAddNote)}
        className="flex h-80 w-96 flex-col items-center justify-center gap-6 rounded-2xl bg-gray-100 px-8 py-4"
      >
        <div className="text-lg font-medium text-gray-700">새 독서 노트</div>
        <textarea
          required
          autoFocus
          name="content"
          className="scrollbar h-40 w-full resize-none scroll-smooth rounded-lg bg-white p-2 text-sm text-gray-500 inset-shadow-sm focus:outline-none"
        ></textarea>
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg bg-gray-200 px-4 py-1 text-gray-500 hover:cursor-pointer hover:text-gray-700 hover:inset-shadow-sm"
          >
            취소
          </button>
          <button
            type="submit"
            className="rounded-lg bg-gray-200 px-4 py-1 text-blue-500 hover:cursor-pointer hover:text-blue-700 hover:inset-shadow-sm"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteModal;
