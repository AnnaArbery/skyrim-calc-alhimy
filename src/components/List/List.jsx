import React from 'react';
import Card from '../Card'

const List = ({list, selected, clickEvent, mouseEvent: {cb, selectedSublist}}) => (
  <div className='selectors__subcontent'>
    {list.length && list.map(item => 
      <Card
        key={item.id}
        selected={selected.includes(item.id)}
        type={item.type}
      >
        <Card.ListItem            
          object={item}
          clickEvent={clickEvent}
          mouseEvent={(e, id) => cb(e, id, selectedSublist(id))}
        />
      </Card>
    )}
  </div>
);

export default List;