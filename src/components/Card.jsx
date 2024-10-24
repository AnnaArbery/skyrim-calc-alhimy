import React, {useState} from 'react';
// import useComponentsStore from '../store/useComponentsStore';

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

const ListItem = ({object, clickEvent}) => (
  <button
    className='listItem'
    onClick={() => clickEvent(object)}
  >
    {object.name}
    <span>{object.cost}</span>
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