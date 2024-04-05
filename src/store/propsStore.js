import { makeAutoObservable } from 'mobx';
import fetchData from '../api/fetchData.js'

class PropsStore {
  props = [];
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
    this.selected = this.selected( props => props.id != id)
  }

  fetch = async () => {
    const props  = await fetchData(process.env.URL_PROPS);
    this.props = props;
  }
}

export default new PropsStore();