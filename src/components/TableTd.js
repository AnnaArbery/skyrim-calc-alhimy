import React from 'react';


const TableTd = ({selected, type, name, handleClick}) => {
  return (
    <div
      className={`card-table table__item${selected ? ' card-table--active':''}${type === 0 ? ' props-envy':''}`}
      onClick={handleClick}
    >
      {name}
    </div>
  )
}

export default TableTd;