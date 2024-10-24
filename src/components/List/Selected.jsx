import React from 'react';

const Selected = ({children}) => (
  <div className='selected'>
    {children}
  </div>
);

const List = ({title, selected, handleClick}) => (
  <div className='selected__list'>
    <b>{title}: </b>
    {!!selected.length && selected.map((item) =>
      <button className='btn-small' key={item.id} onClick={()=>handleClick(item)}>{item.name}</button>
    )}
    <br/>
  </div>
);

Selected.List = List;

export default Selected;