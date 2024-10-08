import React, { useState } from 'react';
import useFilter from '../hooks/useFilter';
import { filterListByList, filterListById } from '../assets/utilits';
import Card from '../components/Card';
import useComponentsStore from '../store/useComponentsStore';
import usePropsStore from '../store/usePropsStore';

const Table = () => {
  const { components } = useComponentsStore();
  const { properties } = usePropsStore();

  const [selected, setSelected] = useState([]);
  const filteredComponents = useFilter(components, selected, filterListByList);

  return (
    <div className='table'>
      <div className='grid'>
        <div className='table__body'>
          {filteredComponents.length > 0 && filteredComponents.map(({id: parentID, name, props}) =>
            <div className='table__row table__row--table'  key={parentID}>
              <div className='card' key={name}>{name}</div>
              {filterListById(properties, props).map(({name:childName, id, type}) => 
                <Card
                  key={`${parentID}-${id}`}
                  selected={selected.includes(id)}
                  type={type}
                >
                  <Card.Td
                    handleClick={() => setSelected(prev => prev.includes(id) ? [] : [id])}
                    name={childName}
                  />
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default Table;