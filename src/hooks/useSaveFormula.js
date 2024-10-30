import { toast } from 'react-toastify';
import useLocalStorage from './useLocalStorage';

const useSaveFormula = () => {
  const [ , setSavedFormulas ] = useLocalStorage('savedFormula', []);

  const saveFormula = ( selectedComponents, selectedProperties ) => {
    if (!selectedComponents.length || !selectedProperties.length) {
      toast.error('Выберите компоненты и свойства', {
        position: 'top-center',
        icon: false,
      });
      return 
    }

    setSavedFormulas(prev => [...prev, {
      id: +new Date(),
      comps: [...selectedComponents],
      props: [...selectedProperties],
      cost: 0
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