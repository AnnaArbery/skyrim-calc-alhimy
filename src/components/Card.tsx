import React, { FC, ReactNode, useState } from 'react';
import { Item } from '@/types/Item';

type CardProps = {
  selected?: boolean;
  type?: string;
  children?: ReactNode;
};

type ListItemProps<T extends Item> = {
  object: T;
  handlerClick: (object: T) => void;
  sublist: T[];
  sublistSelected: T[];
  handlerClickSublist: (subitem: T) => void;
};

type TdProps = {
  handleClick: () => void;
  name: string;
};

type NodeItem = {
  list: { id: string; name: string }[];
};

const Card = ({ selected, type, children }: CardProps) => (
  <div className={`card${selected ? ' card--active' : ''}${type === '0' ? ' card--envy' : ''}`}>
    {children}
  </div>
);

const ListItem: FC<ListItemProps<Item>> = ({
  object,
  sublist,
  sublistSelected,
  handlerClick,
  handlerClickSublist
}) => {
  const [isShowDropdown, setShowDropdown] = useState(false);

  return (
    <div onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
      <button className='listItem' onClick={() => handlerClick(object)}>
        {object.name}
        <span>{object.cost}</span>
      </button>
      {isShowDropdown && !!sublist?.length && (
        <div className='dropdown'>
          {sublist.map(subitem => (
            <button
              key={subitem.id}
              className={sublistSelected.some(select => select.id === subitem.id) ? 'active' : ''}
              onClick={() => handlerClickSublist(subitem)}>
              {subitem.name} <span>{subitem.cost}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Td: FC<TdProps> = ({ handleClick, name }) => (
  <button className='tableItem' onClick={handleClick}>
    {name}
  </button>
);

const NoteItem: FC<NodeItem> = ({ list }) => (
  <div className='noteItem'>
    {list.length &&
      list.map(({ id, name }) => (
        <div key={id} className='noteItem__subitem'>
          {name}
        </div>
      ))}
  </div>
);

Card.ListItem = ListItem;
Card.Td = Td;
Card.NoteItem = NoteItem;

export default Card;
