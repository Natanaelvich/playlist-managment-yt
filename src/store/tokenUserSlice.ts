import {create} from 'zustand';

type TokenUserState = {
    token: string;
    setToken: (token: string) => void;
};

export const useTokenUserStore = create<TokenUserState>((set) => ({
    token: '',
    setToken: (token) => set({ token }),
}));

