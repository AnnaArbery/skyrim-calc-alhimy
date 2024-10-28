import React from 'react';
import Card from '../Card'

const List = ({list, selected, handlerClick, getSublist, sublistSelected, handlerClickSublist}) => (
  <div className='selectors__subcontent'>
    {!!list.length && list.map(item => 
      <Card
        key={item.id}
        selected={selected.some(select => select.id === item.id)}
        type={item.type}
      >
        <Card.ListItem          
          object={item}
          handlerClick={handlerClick}
          sublist={getSublist(item.id)}
          sublistSelected={sublistSelected}
          handlerClickSublist={handlerClickSublist}
        />
      </Card>
    )}
  </div>
);

export default List;