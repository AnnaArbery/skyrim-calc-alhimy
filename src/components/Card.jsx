import React, {useState} from 'react';
// import useComponentsStore from '../store/useComponentsStore';

const Card = ({selected, type, children}) => (
  <div className={`card${selected ? ' card--active':''}${type === '0' ? ' card--envy' : ''}`} >
    {children}
  </div>
)

const ListItem = ({object, handlerClick, sublist, sublistSelected, handlerClickSublist}) => {
  const [isShowDropdown, setShowDropdown] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <button
        className='listItem'
        onClick={() => handlerClick(object)}
      >
        {object.name}
        <span>{object.cost}</span>
      </button>
      {isShowDropdown && !!sublist?.length &&
        <div className='dropdown'>
          {sublist.map(subitem =>
            <button
              key={subitem.id}
              className={sublistSelected.some(select => select.id === subitem.id) ? 'active': ''}
              onClick={() => handlerClickSublist(subitem)}
            >{subitem.name} <span>{subitem.cost}</span></button>
          )}
        </div>
      }  
    </div>
)};

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
    {list.length && list.map(({id, name}) =>
      <div key={id}>{name}</div>
    )}
  </div>
);

Card.ListItem = ListItem;
Card.Td = Td;
Card.NoteItem = NoteItem;

export default Card;