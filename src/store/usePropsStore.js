import { create } from 'zustand';
import fetchData from '../api/fetchData'

const usePropsStore = create((set) => ({
  properties: [],
  // selected: [],
  // addSelected: (id) => {
  //   set(state => ({
  //     selected: [...state.selected, id]
  //   }))
  // },
  // removeSelected: (id) => {
  //   set(state => ({
  //     selected: [...state.selected.filter(comp => comp.id !== id)]
  //   }))
  // },
  fetch: async () => {
    try {
      const properties  = await fetchData(process.env.URL_PROPS);
      set({ properties })
    } catch (e) {
      console.log(e)
    }
  }
}));

export default usePropsStore;