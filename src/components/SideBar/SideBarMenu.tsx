interface SidebarMenuProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  isClosed: boolean;
  isExpanded: boolean;
  setCurrentMenu: () => void;
}

const SidebarMenu = ({
  icon: Icon,
  label,
  active,
  isClosed,
  isExpanded,
  setCurrentMenu,
}: SidebarMenuProps) => {
  return (
    <button
      className={`mb-4 flex h-9 w-full items-center gap-3 rounded-xl text-sm font-medium transition-all duration-300 hover:cursor-pointer ${isExpanded ? 'justify-center p-2' : 'justify-start px-4 py-2'} ${active ? 'bg-white/60 text-gray-900 inset-shadow-2xs hover:bg-gray-200/60' : 'text-gray-600 hover:bg-gray-200/60 hover:text-gray-900 hover:inset-shadow-2xs'}`}
      onClick={setCurrentMenu}
    >
      <Icon className="h-4 w-4" />
      <span
        className={`transition-all duration-300 ${isClosed ? 'hidden opacity-0' : 'opacity-100'}`}
      >
        {label}
      </span>
    </button>
  );
};

export default SidebarMenu;
