import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  const handleActive = ({ isActive }) => (isActive ? 'nav__item--active' : '');

  return (
    <div className='menu'>
      <div className='grid'>
        <div className='nav'>
          <NavLink to='/' className={handleActive}>
            Список
          </NavLink>
          <NavLink to='/table' className={handleActive}>
            Таблица
          </NavLink>
          <NavLink to='/notes' className={handleActive}>
            Заметки
          </NavLink>
          <NavLink to='/about' className={handleActive}>
            Об алхимии
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Nav;
