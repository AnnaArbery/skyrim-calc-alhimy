import React, { FC } from 'react';
import Card from '../Card';
import { Item } from '@/types/Item';

type ListProps = {
  list: Item[];
  selected: Item[];
  getSublist: (id: string) => Item[];
  sublistSelected: Item[];
  handlerClick: (item: Item) => void;
  handlerClickSublist: (item: Item) => void;
};

const List: FC<ListProps> = ({
  list,
  selected,
  handlerClick,
  getSublist,
  sublistSelected,
  handlerClickSublist
}) => (
  <div className='selectors__subcontent'>
    {!!list.length &&
      list.map(item => (
        <Card
          key={item.id}
          selected={selected.some(select => select.id === item.id)}
          type={item?.type}>
          <Card.ListItem
            object={item}
            handlerClick={handlerClick}
            sublist={getSublist(item.id)}
            sublistSelected={sublistSelected}
            handlerClickSublist={handlerClickSublist}
          />
        </Card>
      ))}
  </div>
);

export default List;
