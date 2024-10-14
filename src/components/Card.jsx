import React, {useState} from 'react';

const Card = ({selected, type, children, sublist}) => {
  const [isShowDropdown, setShowDropdown] = useState(false);

  return (
    <div
      className={`card${selected ? ' card--active':''}${type === '0' ? ' card--envy' : ''}`}
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      {children}
      {isShowDropdown && !!sublist?.length &&
        <div className='dropdown'>
          {sublist.map(subitem => <div key={subitem.id}>{subitem.name}</div>)}
        </div>
      }
    </div>
  )
}  

const ListItem = ({object: {id, name, cost}, clickEvent}) => (
  <button
    className='listItem'
    onClick={() => clickEvent(id)}
  >
    {name}
    <span>{cost}</span>
  </button>
);

const Td = ({handleClick, name}) => (
  <button
    className='tableItem'
    onClick={handleClick}
  >
    {name}
  </button>
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