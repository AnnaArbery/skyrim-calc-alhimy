import React from 'react';
import { observer } from 'mobx-react-lite';
import useFetch from '../hooks/useFetch.js';
import { filterListById } from '../assets/utilits.js';
import useLocalStorage from '../hooks/useLocalStorage.js';
import Card from '../components/Card';
import ComponentsStore from '../store/componentsStore.js';
import PropsStore from '../store/propsStore.js';

const Notes = observer(() => {
  const [notes] = useFetch(process.env.URL_NOTES);
  const { components } = ComponentsStore;
  const { props: properties } = PropsStore;
  const [savedFormulas, setSavedFormulas] = useLocalStorage('savedFormula', []);

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
              <button className='btn btn--del' onClick={() => handleDelete(parentID)}>&nbsp;</button>
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
              <button className='btn' onClick={handleDelete} style={{'visibility':'hidden'}}>&nbsp;</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
});

export default Notes;