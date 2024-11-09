import React, { useState, FC } from 'react';
import useFilter from '../hooks/useFilter';
import { filterListByList } from '../utilits';
import Card from '../components/Card';
import useComponentsStore from '../store/useComponentsStore';
import usePropsStore from '../store/usePropsStore';
import { Comps } from '@/types/Item';

const Table = () => {
  const { components } = useComponentsStore();
  const { properties } = usePropsStore();
  const [selected, setSelected] = useState<string[]>([]);

  const propsObj = properties.reduce((acc, { id, name, type }) => {
    acc[Number(id)] = { id, name, type };
    return acc;
  }, []);

  const filteredComponents = useFilter(components, selected, filterListByList) as Comps[];

  return (
    <div className='table'>
      <div className='grid'>
        <div className='table__body'>
          {!!filteredComponents.length &&
            filteredComponents.map(({ id: parentID, name, props }) => (
              <div className='table__row table__row--table' key={parentID}>
                <div className='card' key={name}>
                  {name}
                </div>
                {!!props.length &&
                  props.map(item => {
                    if (!propsObj[Number(item)]) return false;
                    const { id, name: nameProp, type } = propsObj[Number(item)];

                    return (
                      <Card key={`${parentID}-${id}`} selected={selected.includes(id)} type={type}>
                        <Card.Td
                          handleClick={() => setSelected(prev => (prev.includes(id) ? [] : [id]))}
                          name={nameProp}
                        />
                      </Card>
                    );
                  })}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
