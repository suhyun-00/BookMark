import { Bookmark } from 'lucide-react';
import SideBarMenu from '@components/SideBar/SideBarMenu';
import MENU_ITEMS from '@constants/MENU_ITEMS';

interface SideBarProps {
  currentMenu: string;
  setCurrentMenu: React.Dispatch<React.SetStateAction<string>>;
}

const SideBar = ({ currentMenu, setCurrentMenu }: SideBarProps) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 border-r border-gray-200 bg-gray-100/60 p-6 backdrop-blur-xl">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-900">
          <Bookmark className="h-4 w-4 text-white" />
        </div>
        <h1 className="text-xl font-medium">BookMark.</h1>
      </div>
      <div className="mb-8 space-y-1">
        {MENU_ITEMS.map((item) => (
          <SideBarMenu
            icon={item.icon}
            label={item.label}
            setCurrentMenu={() => setCurrentMenu(item.status)}
            active={currentMenu === item.status}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
