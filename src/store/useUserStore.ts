import {create} from 'zustand';

type User = {
  name: string;
  email: string;
  token?: string; // Optional token for authentication
  id: string; // Unique identifier for the user
};

type Auth = {
  token: string;
};

type UserState = {
  user: User | null;
  auth?: Auth; // Optional auth object
  login: (auth: Auth) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>(set => ({
  user: null,
  auth: undefined,
  login: auth => set({auth}),
  logout: () => set({user: null}),
}));
