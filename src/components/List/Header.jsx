import React from 'react';

const SORT_LIST_COST = ['', '▼', '▲'];

const HeaderList = ({value, useful, sortOrder, handlerSearch, handlerReset, handlerSave, handlerClear, handlerUseful, handlerSort}) => (
  <div className='selectors__subhead'>
    <input type='text' value={value} onChange={handlerSearch} className='selectors__input' placeholder='Поиск...'/>
    <button className='btn btn--clear' onClick={handlerClear} title='Очистить поле' label='Очистить поле'>очистить</button>
    <button className='btn-small' onClick={handlerReset} title='Сбросить все выбранное' label='Сбросить все выбранное'>Сброс</button>
    <button className='btn-small' onClick={handlerSave} title='Сохранить локально в заметки' label='Сохранить локально в заметки'>В заметки</button>
    <button className='btn-small' onClick={handlerSort} title='Сортировать по цене' label='Сортировать по цене'>
      {!sortOrder && <>По имени <span>▼</span></>}
      {!!sortOrder && <>По цене <span>{SORT_LIST_COST[sortOrder]}</span></>}
    </button>
    {handlerUseful && <button className='btn-small' onClick={handlerUseful} title='Фильтр эффектов' label='Фильтр эффектов'>{useful}</button>}
  </div>
);

export default HeaderList;