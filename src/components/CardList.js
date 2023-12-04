import React from 'react';
import Card from './Card'

const CardList = ({list, selected, clickEvent, mouseEvent: {cb, selectedSublist}}) => {
  return (
    <ul className='calculator__subcontent'>
      {list.length > 0 && list.map(item => 
        <Card
          key={item.id}
          object={item}
          selected={selected.includes(item.id)}
          clickEvent={clickEvent}
          mouseEvent={(e, id) => cb(e, id, selectedSublist(id))}
        />
      )}
    </ul>
  )
}

export default CardList;