import { atom, selector } from 'recoil';

// Backend URL for production
export const BACKEND_URL = 'https://chess-2-y063.onrender.com';
export interface User {
  token: string;
  id: string;
  name: string;
}

export const userAtom = atom<User>({
  key: 'user',
  default: selector({
    key: 'user/default',
    get: async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        }
      } catch (e) {
        console.error(e);
      }

      return null;
    },
  }),
});
