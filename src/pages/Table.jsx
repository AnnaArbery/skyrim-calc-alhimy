import React, { useState } from 'react';
import useFilter from '../hooks/useFilter';
import { filterListByList } from '../utilits';
import Card from '../components/Card';
import useComponentsStore from '../store/useComponentsStore';
import usePropsStore from '../store/usePropsStore';

const Table = () => {
  const { components } = useComponentsStore();
  const { properties } = usePropsStore();

  const [selected, setSelected] = useState([]);

  const propsObj = properties.reduce((acc, {id, name, type}) => {
    acc[id] = { id, name, type };
    return acc;
  }, []);
  
  const filteredComponents = useFilter(components, selected, filterListByList);

  return (
    <div className='table'>
      <div className='grid'>
        <div className='table__body'>
          {!!filteredComponents.length && filteredComponents.map(({id: parentID, name, props}) =>
            <div className='table__row table__row--table'  key={parentID}>
              <div className='card' key={name}>{name}</div>
              {!!props.length && props.map((item) => {
                if (!propsObj[item]) return false;
                const { id, name: nameProp, type } = propsObj[item];

                return (
                  <Card
                    key={`${parentID}-${id}`}
                    selected={selected.includes(id)}
                    type={type}
                  >
                    <Card.Td
                      handleClick={() => setSelected(prev => prev.includes(id) ? [] : [id])}
                      name={nameProp}
                    />
                  </Card>                  
                )                
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default Table;