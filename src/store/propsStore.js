import { makeAutoObservable, runInAction } from 'mobx';
import fetchData from '../api/fetchData.js'

class PropsStore {
  props = []
  selected = []

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
    this.selected = this.selected( props => props.id != id)
  }

  fetch = async () => {
    try {
      const props  = await fetchData(process.env.URL_PROPS);
      runInAction(() => {
        this.props = props;
      })   

    } catch (e) {
      console.log(e)
    }
  }
}

export default new PropsStore();