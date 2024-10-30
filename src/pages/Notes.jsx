import React from 'react';
import { toast } from 'react-toastify';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from '../components/Card';
import Cost from '../components/Cost';

const Notes = () => {
  const [ notes ] = useFetch(process.env.URL_NOTES || []);
  const [ savedFormulas, setSavedFormulas ] = useLocalStorage('savedFormula', []);

  const listFormuls = [
    ...savedFormulas,
    ...notes
  ];

  const handlerDelete = id => {
    setSavedFormulas(prev => prev.filter(list => list.id !== id));
    toast.success('Формула удалена из списка', {
      position: 'top-center',
      icon: false,
    });
  }
  const handlerSave = (id) => (cost) => setSavedFormulas(prev => prev.map(item => {
    if (item.id === id) item.cost = cost;
    return item
  }))

  return (
    <div className='table'>
      <div className='grid'>
        <div className='table__body'>
          {listFormuls.length > 0 && listFormuls.map(({id: parentID, comps, props, cost}) => {
            
            const isSaved = savedFormulas.some(list => list.id === parentID);

            return (
              <div className='table__row table__row--notes' key={parentID}>
                <Card key={`${parentID}-1`} >
                  <Card.NoteItem list={comps}/>
                </Card>
                <Card key={`${parentID}-2`} >
                  <Card.NoteItem list={props}/>
                </Card>
                <div className='col-manage'>
                  <Cost
                    id={parentID}
                    cost={cost}
                    handlerSave={handlerSave(parentID)}
                    showButton={isSaved}
                  />
                  {isSaved && <button className='btn btn--del' onClick={() => handlerDelete(parentID)} label='delete'>&nbsp;</button>}      
                </div>
              </div>              
            )
          }

          )}
        </div>
      </div>
    </div>
  )
};

export default Notes;