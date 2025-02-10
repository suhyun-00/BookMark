interface SideBarMenuProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  setCurrentMenu: () => void;
}

const SideBarMenu = ({ icon: Icon, label, active, setCurrentMenu }: SideBarMenuProps) => {
  return (
    <button
      className={`flex w-full items-center justify-start gap-3 rounded-xl px-4 py-2 text-sm font-medium hover:cursor-pointer ${active ? 'bg-white/60 text-gray-900 inset-shadow-2xs hover:bg-gray-200/60' : 'text-gray-600 hover:bg-gray-200/60 hover:text-gray-900 hover:inset-shadow-2xs'}`}
      onClick={setCurrentMenu}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
};

export default SideBarMenu;
