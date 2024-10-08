import { create } from 'zustand';
import fetchData from '../api/fetchData'

const useComponentsStore = create((set) => ({
  components: [],
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
      const components  = await fetchData(process.env.URL_COMPONENTS);
      set({ components })
    } catch (e) {
      console.log(e)
    }
  }
}));

export default useComponentsStore;