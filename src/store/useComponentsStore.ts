import { create } from 'zustand';
import fetchData from '../api/fetchData';
import { Comps } from '@/types/Item';
import { IListState } from './../types/IListState';

interface ICompState<T> extends IListState<T> {
  components: T[];
}

const useComponentsStore = create<ICompState<Comps>>((set, get) => ({
  components: [],
  selected: [],
  add: item => {
    set(state => ({
      selected: [...state.selected, item].sort((a, b) => (a.name > b.name ? 1 : -1))
    }));
  },
  remove: item => {
    set(state => ({
      selected: [...state.selected.filter(comp => comp.id !== item.id)]
    }));
  },
  reset: () => {
    set(() => ({
      selected: []
    }));
  },
  fetch: async () => {
    try {
      const components = await fetchData(process.env.URL_COMPONENTS);
      set({ components });
    } catch (e) {
      console.log(e);
    }
  }
}));

export default useComponentsStore;
