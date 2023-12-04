import {useState} from 'react';

const useSelect = (initialValue, count) => {
  const [selected, setSelect] = useState(initialValue);

  const handleSelect = id => {
    if (id === null) {
      setSelect([]);
      return;
    }

    if (selected.length > 0 && selected.includes(id)) {
      setSelect(prev => prev.filter(item => item !== id) )
    } else if (selected.length < count) {
      setSelect(prev => [...prev, id] )
    }
  }

  return [selected, handleSelect];
}

export default useSelect;