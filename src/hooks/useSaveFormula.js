import useLocalStorage from './useLocalStorage';
import { toast } from 'react-toastify';

const useSaveFormula = () => {
  const [ , setSavedFormulas ] = useLocalStorage('savedFormula', []);

  const saveFormula = ( selectedComponents, selectedProperties ) => {
    setSavedFormulas(prev => [...prev, {
      id: +new Date(),
      comps: [...selectedComponents],
      props: [...selectedProperties]
    }]);

    toast.success('Сохранено в заметки', {
      position: 'top-center',
      icon: false,
    });
  }

  return {
    saveFormula
  }
}

export default useSaveFormula;