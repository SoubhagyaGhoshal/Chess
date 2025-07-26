import { PuzzleIcon, LogInIcon, LogOutIcon, SettingsIcon } from 'lucide-react';
import { BACKEND_URL } from '../../config';
export const UpperNavItems = [
  {
    title: 'Play',
    icon: PuzzleIcon,
    href: '/game/random',
    color: 'text-green-500',
  },
  //
  // {
  //   title: 'Puzzles',
  //   icon: PuzzleIcon,
  //   href: '/',
  //   color: 'text-sky-500',
  // },
  // {
  //   title: 'Learn',
  //   icon: PuzzleIcon,
  //   href: '/',
  //   color: 'text-sky-500',
  // },
];

export const LowerNavItems = [
  {
    title: 'Login',
    icon: LogInIcon,
    href: '/login',
    color: 'text-green-500',
  },
  {
    title: 'Logout',
    icon: LogOutIcon,
    href: `${BACKEND_URL}/auth/logout`,
    color: 'text-green-500',
  },
  {
    title: 'Settings',
    icon: SettingsIcon,
    href: '/settings',
    color: 'text-green-500',
  },
];
