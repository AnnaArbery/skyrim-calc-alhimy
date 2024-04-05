import React from 'react';

const Selected = ({children}) => (
  <div className='selected'>
    {children}
  </div>
);

const List = ({title, list, selected, handleClick}) => (
  <div className='selected__list'>
    <b>{title}: </b>
    {list.length && list.map(({id, name}) =>
      selected.includes(id) && <span key={id} onClick={()=>handleClick(id)}>{name}</span>
    )}
    <br/>
  </div>
);

Selected.List = List;


export default Selected;