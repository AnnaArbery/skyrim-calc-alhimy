import React from 'react';

const Card = ({selected, type, children}) => (
  <div className={`card${selected ? ' card--active':''}${type == 0 ? ' card--envy' : ''}`}>
    {children}
  </div>
)

const ListItem = ({object: {id, name, cost}, clickEvent, mouseEvent}) => (
  <div
    className='listItem'
    onClick={() => clickEvent(id)}
    onMouseEnter={e => mouseEvent(e, id)}
    onMouseLeave={e => mouseEvent(e, null)}
  >
    {name}
    <span>{cost}</span>
  </div>
);

const Td = ({handleClick, name}) => (
  <div
    className='tableItem'
    onClick={handleClick}
  >
    {name}
  </div>
);

const NoteItem = ({list}) => (
  <div className='noteItem'>
    {list.length && list.map(({name}, indx) =>
      <div key={indx}>{name}</div>
    )}
  </div>
);

Card.ListItem = ListItem;
Card.Td = Td;
Card.NoteItem = NoteItem;

export default Card;