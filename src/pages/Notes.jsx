import React, { useMemo } from 'react';
import { toast } from 'react-toastify';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from '../components/Card';
import Cost from '../components/Cost';
import useComponentsStore from '../store/useComponentsStore';
import usePropsStore from '../store/usePropsStore';

const Notes = () => {
  const { components } = useComponentsStore();
  const { properties } = usePropsStore();
  const [notes] = useFetch(process.env.URL_NOTES || []);
  const [savedFormulas, setSavedFormulas] = useLocalStorage('savedFormula', []);
  const listFormuls = [...savedFormulas, ...notes];

  const objComps = useMemo(
    () =>
      components.reduce((acc, { id, name }) => {
        acc[id] = { id, name };
        return acc;
      }, []),
    [components]
  );

  const objProps = useMemo(
    () =>
      properties.reduce((acc, { id, name }) => {
        acc[id] = { id, name };
        return acc;
      }, []),
    [properties]
  );

  const handlerDelete = id => {
    setSavedFormulas(prev => prev.filter(list => list.id !== id));
    toast.success('Формула удалена из списка', {
      icon: false
    });
  };

  const handlerSave = id => cost =>
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
          {listFormuls.length > 0 &&
            listFormuls.map(({ id: parentID, comps, props, cost }) => {
              const isSaved = savedFormulas.some(list => list.id === parentID);

              return (
                <div className='table__row table__row--notes' key={parentID}>
                  <Card key={`${parentID}-1`}>
                    {comps && <Card.NoteItem list={comps.map(item => objComps[item])} />}
                  </Card>
                  <Card key={`${parentID}-2`}>
                    {props && <Card.NoteItem list={props.map(item => objProps[item])} />}
                  </Card>
                  <div className='col-manage'>
                    <Cost
                      id={parentID}
                      cost={cost}
                      handlerSave={handlerSave(parentID)}
                      showButton={isSaved}
                    />
                    {isSaved && (
                      <button
                        className='btn btn--del'
                        onClick={() => handlerDelete(parentID)}
                        label='delete'>
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
