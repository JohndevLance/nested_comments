import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  name: string;
  email: string;
  token?: string;
  id: string;
};

type Auth = {
  token: string;
};

type UserState = {
  user: User | null;
  auth?: Auth;
  login: (auth: Auth, user: User) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null,
      auth: undefined,
      login: (auth, user) => set({auth, user}),
      logout: () => set({auth: undefined, user: null}),
    }),
    {
      name: 'user-store',
      storage: {
        getItem: async name => {
          const item = await AsyncStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async name => {
          await AsyncStorage.removeItem(name);
        },
      },
    },
  ),
);
