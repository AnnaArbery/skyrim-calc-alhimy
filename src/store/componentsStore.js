import { makeAutoObservable, runInAction } from 'mobx';
import fetchData from '../api/fetchData.js'

class ComponentsStore {
  components = [];
  selected = [];

  constructor() {
    makeAutoObservable(this);
  }

  addSelected(id) {
    this.selectedComponents = [
      ...this.selected,
      id
    ]
  }

  removeSelected(id) {
    this.selected = this.selected( comp => comp.id != id)
  }
  
  fetch = async () => {
    try {
      const components  = await fetchData(process.env.URL_COMPONENTS);
      runInAction(() => {
        this.components = components;
      })      
    } catch (e) {
      console.log(e)
    }
  }
}

export default new ComponentsStore();