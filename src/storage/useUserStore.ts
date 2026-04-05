import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import zustandStorage from './zustand.storage';
import { User } from '@/types/user.type';
import { refreshToken } from '@/lib/api';


type UserStore = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  setUser: (user: User) => void;
  setToken: (token: string | null) => void;
    setRefreshToken:(token:string | null) => void;
  clearAuth: () => void;
};

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      user: null,
      token: null,
       refreshToken:null,


      setUser: user => set({user}),
      setToken: token => set({token}),
      setRefreshToken: token => set({token}),

      clearAuth: () =>
        set({
          user: null,
          token: null,
          refreshToken:null
        }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export default useUserStore
