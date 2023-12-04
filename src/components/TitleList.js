import React from 'react';


const TitleList = ({title, list, selected, handleClick}) => {
  return (
    <>
      <b>{title}: </b>
      {list.length > 0 && list.map(({id, name}) =>
        selected.includes(id) && <span key={id} onClick={()=>handleClick(id)}>{name}</span>
      )}
      <br/>
    </>
  )
}

export default TitleList;