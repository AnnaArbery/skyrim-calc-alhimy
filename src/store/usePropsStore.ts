import { create } from 'zustand';
import fetchData from '../api/fetchData';
import { Props } from '@/types/Item';
import { IListState } from '@/types/IListState';

interface IPropsState<T> extends IListState<T> {
  properties: T[];
}

const usePropsStore = create<IPropsState<Props>>(set => ({
  properties: [],
  selected: [],
  add: item => {
    set(state => ({
      selected: [...state.selected, item].sort((a, b) => (a.name > b.name ? 1 : -1))
    }));
  },
  remove: item => {
    set(state => ({
      selected: [...state.selected.filter(prop => prop.id !== item.id)]
    }));
  },
  reset: () => {
    set(() => ({
      selected: []
    }));
  },
  fetch: async () => {
    try {
      const properties = await fetchData(process.env.URL_PROPS);
      set({ properties });
    } catch (e) {
      console.log(e);
    }
  }
}));

export default usePropsStore;
