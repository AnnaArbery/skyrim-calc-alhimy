import { useState } from 'react';
import useLocalStorage from './useLocalStorage';


const useSaveFormula = () => {
  const [ , setSavedFormulas ] = useLocalStorage('savedFormula', []);
  const [ statusSave, setStatusSave ] = useState('');

  const saveFormula = ( selectedComponents, selectedProperties ) => {
    setSavedFormulas(prev => [...prev, {
      id: +new Date(),
      comps: [...selectedComponents],
      props: [...selectedProperties]
    }]);

    setStatusSave(true);

    setTimeout(() => {
      setStatusSave(false);
    }, 1500)
  }

  return {
    statusSave,
    saveFormula
  }
}

export default useSaveFormula;