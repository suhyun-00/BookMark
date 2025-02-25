import { Bookmark } from 'lucide-react';

import MENU_ITEMS from '@constants/MENU_ITEMS';

import SidebarMenu from '@components/Sidebar/SidebarMenu';

interface SidebarProps {
  currentMenu: string;
  isExpanded: boolean;
  isClosed: boolean;
  setCurrentMenu: React.Dispatch<React.SetStateAction<string>>;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClosed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({
  currentMenu,
  isExpanded,
  isClosed,
  setCurrentMenu,
  setIsExpanded,
  setIsClosed,
}: SidebarProps) => {
  const toggleSidebar = () => {
    if (isClosed) {
      setIsExpanded((prev) => !prev);
      setTimeout(() => setIsClosed((prev) => !prev), 150);
    } else {
      setIsClosed((prev) => !prev);
      setIsExpanded((prev) => !prev);
    }
  };

  return (
    <div
      className={`sticky top-0 h-screen border-r border-gray-200 bg-gray-100/60 backdrop-blur-xl transition-all duration-300 ${isExpanded ? 'w-64 p-6' : 'flex w-16 flex-col items-center py-6 sm:w-20 sm:p-6'}`}
    >
      <div className="mb-10 flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-900 hover:cursor-pointer"
        >
          <Bookmark className="h-4 w-4 text-white" />
        </button>
        <h1
          className={`text-xl font-medium transition-all duration-1000 ${isClosed ? 'hidden opacity-0' : 'opacity-100'}`}
        >
          BookMark.
        </h1>
      </div>
      <div className="mb-8 space-y-1">
        {MENU_ITEMS.map((item) => (
          <SidebarMenu
            icon={item.icon}
            label={item.label}
            active={currentMenu === item.status}
            isClosed={isClosed}
            isExpanded={isExpanded}
            setCurrentMenu={() => setCurrentMenu(item.status)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
