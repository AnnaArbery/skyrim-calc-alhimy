import React from 'react';

const Nav = ({handlePage, page}) => {

  return (
    <div className='nav'>
      <button onClick={()=>handlePage('selectors')} className={(page === 'selectors') ? 'nav__item--active':''}>Список</button>
      <button onClick={()=>handlePage('table')} className={(page === 'table') ? 'nav__item--active':''}>Таблица</button>
      <button onClick={()=>handlePage('notes')} className={(page === 'notes') ? 'nav__item--active':''}>Заметки</button>
      <button onClick={()=>handlePage('about')} className={(page === 'about') ? 'nav__item--active':''}>Об алхимии</button>
    </div>
  )
}

export default Nav;