interface ConfirmDeleteProps {
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => Promise<void>;
}

const ConfirmDelete = ({ setIsClicked, handleDelete }: ConfirmDeleteProps) => {
  return (
    <div
      onClick={() => setIsClicked(false)}
      className="fixed inset-0 flex items-center justify-center bg-gray-900/20 text-gray-500"
    >
      <div className="flex h-40 w-80 flex-col items-center gap-4 rounded-2xl bg-gray-100">
        <div className="mt-14 text-lg">책을 삭제하시겠습니까?</div>
        <div className="mt-3 flex w-full items-center justify-around border-t border-gray-300">
          <button
            onClick={() => setIsClicked(false)}
            className="h-full w-full rounded-bl-2xl border-r border-gray-300 py-3 hover:cursor-pointer hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={handleDelete}
            className="h-full w-full rounded-br-2xl py-3 text-red-500 hover:cursor-pointer hover:bg-gray-300"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
