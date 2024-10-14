import React from 'react';
import Card from '../Card'

const List = ({list, selected, clickEvent, getSublist}) => (
  <div className='selectors__subcontent'>
    {!!list.length && list.map(item => 
      <Card
        key={item.id}
        selected={selected.includes(item.id)}
        type={item.type}
        sublist={getSublist(item.id)}
      >
        <Card.ListItem          
          object={item}
          clickEvent={clickEvent}
        />
      </Card>
    )}
  </div>
);

export default List;