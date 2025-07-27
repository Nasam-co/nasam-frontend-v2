import { create } from 'zustand';

interface OverviewUIState {
  isRefreshing: boolean;
  setRefreshing: (refreshing: boolean) => void;
}

export const useOverviewStore = create<OverviewUIState>((set) => ({
  isRefreshing: false,
  setRefreshing: (refreshing) => {
    set({ isRefreshing: refreshing });
  },
}));

export const useIsRefreshing = () => useOverviewStore((state) => state.isRefreshing);
export const useSetRefreshing = () => useOverviewStore(state => state.setRefreshing);