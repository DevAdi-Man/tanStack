import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import zustandStorage from './zustand.storage';
import { User } from '@/types/user.type';


type UserStore = {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string | null) => void;
  clearAuth: () => void;
};

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      user: null,
      token: null,

      setUser: user => set({user}),
      setToken: token => set({token}),

      clearAuth: () =>
        set({
          user: null,
          token: null,
        }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export default useUserStore