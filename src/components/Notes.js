import React from 'react';
import useFetch from '../hooks/useFetch.js'
import {filterListById} from '../assets/utilits'
import TableTdNotes from './TableTdNotes'
import useLocalStorage from '../hooks/useLocalStorage.js'

const Table = ({components, properties}) => {
  const [notes] = useFetch('./store/notes.json');
  const [savedFormulas, setSavedFormulas] = useLocalStorage('savedFormula', [])

  const handleDelete = (id) => {
    setSavedFormulas(prev => prev.filter((list) => list.id !== id))
  }

  return (
    <div className='table'>
      <div className='grid'>
        <div className='table__body'>
          {savedFormulas.length > 0 && savedFormulas.map(({comps, props, id: parentID}) => 
            <div className='table__row'  key={parentID}>
              <TableTdNotes key={`${parentID}-1`} list={filterListById(components, comps)} />
              <TableTdNotes key={`${parentID}-2`} list={filterListById(properties, props)} />
              <button className='btn btn--del' onClick={() => handleDelete(parentID)}>&nbsp;</button>
            </div>
          )}
          {notes.length > 0 && notes.map(({comps, props}, parentID) => 
            <div className='table__row'  key={parentID}>
              <TableTdNotes key={`${parentID}-3`} list={filterListById(components, comps)} />
              <TableTdNotes key={`${parentID}-4`} list={filterListById(properties, props)} />
              <button className='btn' onClick={handleDelete} style={{'visibility':'hidden'}}>&nbsp;</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Table;