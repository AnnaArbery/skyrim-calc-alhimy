import React from 'react';
import useFetch from '../hooks/useFetch';
import { filterListById } from '../assets/utilits';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from '../components/Card';

import useComponentsStore from '../store/useComponentsStore';
import usePropsStore from '../store/usePropsStore';

const Notes = () => {
  const { components } = useComponentsStore();
  const { properties } = usePropsStore();
  const [ notes ] = useFetch(process.env.URL_NOTES);
  const [ savedFormulas, setSavedFormulas ] = useLocalStorage('savedFormula', []);

  const handleDelete = id => setSavedFormulas(prev => prev.filter(list => list.id !== id))

  return (
    <div className='table'>
      <div className='grid'>
        <div className='table__body'>
          {savedFormulas.length > 0 && savedFormulas.map(({comps, props, id: parentID}) => 
            <div className='table__row table__row--notes' key={parentID}>
              <Card key={`${parentID}-1`} >
                <Card.NoteItem list={filterListById(components, comps)}/>
              </Card>
              <Card key={`${parentID}-2`} >
                <Card.NoteItem list={filterListById(properties, props)}/>
              </Card>
              <button className='btn btn--del' onClick={() => handleDelete(parentID)} label='delete'>&nbsp;</button>
            </div>
          )}
          {notes.length > 0 && notes.map(({comps, props}, parentID) => 
            <div className='table__row  table__row--notes'  key={parentID}>
              <Card key={`${parentID}-3`} >
                <Card.NoteItem list={filterListById(components, comps)}/>
              </Card>
              <Card key={`${parentID}-4`} >
                <Card.NoteItem list={filterListById(properties, props)}/>
              </Card>
              <button className='btn' onClick={handleDelete} style={{'visibility':'hidden'}} label='hidden'>&nbsp;</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default Notes;