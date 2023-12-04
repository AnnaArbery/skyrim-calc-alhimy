import React from 'react';

const TableTdNotes = ({list}) => {
  return (
    <div className='card-table table__item-notes'>
      {list.map(({name}, indx) =>
        <div key={indx}>{name}</div>
      )}
    </div>
  )
}

export default TableTdNotes;