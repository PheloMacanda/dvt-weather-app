import { create } from 'zustand';

interface IUserStore {
    userId: string | null;
    isLoggedIn: boolean;
    setUserId: (userId: string | null) => Promise<void>;
    setIsLoggedIn: (isLoggedIn: boolean) => Promise<void>;
};

export const useUserStore = create<IUserStore>((set) => ({
    userId: null,
    isLoggedIn: false,
    setUserId: async (userId: string | null) => {
        try {
            set({ userId });
        } catch (error) {
            console.error('Error in setUserId:', error);
        }
    },
    setIsLoggedIn: async (isLoggedIn: boolean) => {
        try {
            set({ isLoggedIn });
        } catch (error) {
            console.error('Error in setUserId:', error);
        }
    },
}));