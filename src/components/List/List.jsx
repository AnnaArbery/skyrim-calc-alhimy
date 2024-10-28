import React from 'react';
import Card from '../Card'

const List = ({list, selected, clickEvent, getSublist}) => (
  <div className='selectors__subcontent'>
    {!!list.length && list.map(item => 
      <Card
        key={item.id}
        selected={selected.some(select => select.id === item.id)}
        type={item.type}
      >
        <Card.ListItem          
          object={item}
          handlerClick={clickEvent}
          sublist={getSublist(item.id)}
        />
      </Card>
    )}
  </div>
);

export default List;