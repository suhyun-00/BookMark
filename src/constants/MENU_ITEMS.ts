import { Home, BookMarked, CircleCheckBig, Clock, Pause } from 'lucide-react';
const MENU_ITEMS = [
  {
    icon: Home,
    label: '홈',
    status: 'all',
  },
  {
    icon: BookMarked,
    label: '읽는 중',
    status: 'reading',
  },
  {
    icon: CircleCheckBig,
    label: '완독한 책',
    status: 'completed',
  },
  {
    icon: Clock,
    label: '읽을 예정',
    status: 'planned',
  },
  {
    icon: Pause,
    label: '중단',
    status: 'paused',
  },
];

export default MENU_ITEMS;
