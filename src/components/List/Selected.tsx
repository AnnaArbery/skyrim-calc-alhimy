import React, { FC, ReactNode } from 'react';
import { Item } from '@/types/Item';

type ListProps = {
  title: string;
  selected: Item[];
  handleClick: (item: Item) => void;
  sum?: number;
};

const Selected = ({ children }: { children: ReactNode }) => (
  <div className='selected'>{children}</div>
);

const List: FC<ListProps> = ({ title, selected, handleClick, sum }) => (
  <div className='selected__list'>
    <b>{title}: </b>
    {!!selected.length &&
      selected.map(item => (
        <button className='btn-small' key={item.id} onClick={() => handleClick(item)}>
          {item.name}
        </button>
      ))}
    <br />
    {sum && (
      <>
        {' '}
        <b>Стоимость: </b>
        {sum}
      </>
    )}
  </div>
);

Selected.List = List;

export default Selected;
