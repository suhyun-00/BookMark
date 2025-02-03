import { useState } from "react";
import SideBarMenu from "@components/SideBar/SideBarMenu";
import {
  Bookmark,
  Home,
  BookMarked,
  CircleCheckBig,
  Clock,
  Pause,
} from "lucide-react";

const SideBar = () => {
  const [currentMenu, setCurrentMenu] = useState("홈");

  return (
    <div className="fixed top-0 left-0 w-64 h-screen p-6 border-r border-gray-200 bg-gray-100/60 backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-xl">
          <Bookmark className="w-4 h-4 text-white" />
        </div>
        <h1 className="text-xl font-medium">BookMark.</h1>
      </div>
      <div className="mb-8 space-y-1">
        <SideBarMenu
          icon={Home}
          label="홈"
          setCurrentMenu={setCurrentMenu}
          active={currentMenu === "홈"}
        />
        <SideBarMenu
          icon={BookMarked}
          label="읽는 중"
          setCurrentMenu={setCurrentMenu}
          active={currentMenu === "읽는 중"}
        />
        <SideBarMenu
          icon={CircleCheckBig}
          label="완독한 책"
          setCurrentMenu={setCurrentMenu}
          active={currentMenu === "완독한 책"}
        />
        <SideBarMenu
          icon={Clock}
          label="읽을 예정"
          setCurrentMenu={setCurrentMenu}
          active={currentMenu === "읽을 예정"}
        />
        <SideBarMenu
          icon={Pause}
          label="중단"
          setCurrentMenu={setCurrentMenu}
          active={currentMenu === "중단"}
        />
      </div>
    </div>
  );
};

export default SideBar;
