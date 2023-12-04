import React, {useState} from 'react';
import useFilter from '../hooks/useFilter.js'
import {filterListByList, filterListById} from '../assets/utilits'
import TableTd from './TableTd'

const Table = ({components, properties}) => {
  const [selected, setSelected] = useState([]);
  const filteredComponents = useFilter(components, selected, filterListByList);

  return (
    <div className='table'>
      <div className='grid'>
        <div className='table__body'>
          {filteredComponents.length > 0 && filteredComponents.map(({id: parentID, name, props}) =>
            <div className='table__row table__row--table'  key={parentID}>
              <div className='table__item card-table' key={name}>{name}</div>
              {filterListById(properties, props).map(({name, id, type}) => 
                <TableTd
                  key={`${parentID}-${id}`}
                  handleClick={()=>setSelected(prev => prev.includes(id) ? [] : [id])}
                  name={name}
                  selected={selected.includes(id)}
                  type={type}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Table;