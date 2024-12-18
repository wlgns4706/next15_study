import { init } from 'next/dist/compiled/webpack/webpack';
import { create } from 'zustand';
type TMenuState = {
  isShowMenubar: boolean;
};

type TMenuAction = {
  actions: {
    handleShowMenubar: () => void;
    resetState: (keys?: (keyof TMenuState)[]) => void;
  };
};

const initialState: TMenuState = {
  isShowMenubar: true,
};

export const useMenuStore = create<TMenuState & TMenuAction>((set, get) => ({
  ...initialState,
  actions: {
    handleShowMenubar: () => set((state) => ({ ...state, isShowMenubar: !state.isShowMenubar })),
    resetState: (keys) => {
      if (!keys) {
        set(initialState);
        return;
      }
      keys.map((key) => set({ [key]: initialState[key] }));
    },
  },
}));
