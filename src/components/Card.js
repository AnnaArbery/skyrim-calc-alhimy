import React from 'react';

const Card = ({object: {id, name, cost, type}, selected, clickEvent, mouseEvent}) => {
  return (
    <li
      className={`card-item${selected ? ' card-item--active':''}${type === 0 ? ' props-envy':''}`}
      onClick={() => clickEvent(id)}
      onMouseEnter={e => mouseEvent(e, id)}
      onMouseLeave={e => mouseEvent(e, null)}
    >
      {name}
      <span>{cost}</span>
    </li>
  )
}

export default Card;