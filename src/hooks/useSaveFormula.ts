import { toast } from 'react-toastify';
import useLocalStorage from './useLocalStorage';
import { Comps, Props } from '@/types/Item';

const useSaveFormula = () => {
  const [, setSavedFormulas] = useLocalStorage('savedFormula', []);

  const saveFormula = (selectedComponents: Comps[], selectedProperties: Props[]) => {
    if (!selectedComponents.length || !selectedProperties.length) {
      toast.error('Выберите компоненты и свойства', {
        icon: false
      });
      return;
    }

    setSavedFormulas(prev => [
      ...prev,
      {
        id: +new Date(),
        comps: [...selectedComponents.map(item => item.id)],
        props: [...selectedProperties.map(item => item.id)],
        cost: 0
      }
    ]);

    toast.success('Сохранено в заметки', {
      icon: false
    });
  };

  return {
    saveFormula
  };
};

export default useSaveFormula;
