import React, { useMemo } from 'react';
import { toast } from 'react-toastify';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from '../components/Card';
import Cost from '../components/Cost';
import useComponentsStore from '../store/useComponentsStore';
import usePropsStore from '../store/usePropsStore';
import ItemFormula from '@/types/ItemFormula';

const Notes = () => {
  const { components } = useComponentsStore();
  const { properties } = usePropsStore();
  const [notes] = useFetch<ItemFormula[]>(process.env.URL_NOTES) || [];
  const [savedFormulas, setSavedFormulas] = useLocalStorage('savedFormula', []) as [
    ItemFormula[],
    (prev: ItemFormula[]) => void
  ];
  const listFormulas = [...savedFormulas, ...notes];

  const objComps = useMemo(
    () =>
      components.reduce((acc, { id, name }) => {
        acc[Number(id)] = { id, name };
        return acc;
      }, []),
    [components]
  );

  const objProps = useMemo(
    () =>
      properties.reduce((acc, { id, name }) => {
        acc[Number(id)] = { id, name };
        return acc;
      }, []),
    [properties]
  );

  const handlerDelete = (id: string) => {
    setSavedFormulas(prev => prev.filter(list => list.id !== id));
    toast.success('Формула удалена из списка', {
      icon: false
    });
  };

  const handlerSave = (id: string) => (cost: string) =>
    setSavedFormulas(prev =>
      prev.map(item => {
        if (item.id === id) item.cost = cost;
        return item;
      })
    );

  if (!components.length || !properties.length) return false;

  return (
    <div className='table'>
      <div className='grid'>
        <div className='table__body'>
          {listFormulas.length > 0 &&
            listFormulas.map(({ id: parentID, comps, props, cost }) => {
              const isSaved = savedFormulas.some(list => list.id === parentID);

              return (
                <div className='table__row table__row--notes' key={parentID}>
                  <Card key={`${parentID}-1`}>
                    {comps && <Card.NoteItem list={comps.map(item => objComps[Number(item)])} />}
                  </Card>
                  <Card key={`${parentID}-2`}>
                    {props && <Card.NoteItem list={props.map(item => objProps[Number(item)])} />}
                  </Card>
                  <div className='col-manage'>
                    <Cost cost={cost} handlerSave={handlerSave(parentID)} showButton={isSaved} />
                    {isSaved && (
                      <button
                        className='btn btn--del'
                        onClick={() => handlerDelete(parentID)}
                        title='delete'>
                        &nbsp;
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Notes;
