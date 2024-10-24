import React from 'react';

const SORT_ORDER = ['▼', '▲'];

const HeaderList = ({value, useful, sortOrder, handler, handleReset, handleSave, handleClear, handleUseful}) => (
  <div className='selectors__subhead'>
    <input type='text' value={value} onChange={handler} className='selectors__input' placeholder='Поиск...'/>
    <button className='btn btn--clear' onClick={handleClear} title='Очистить поле' label='Очистить поле'>очистить</button>
    <button className='btn-small' onClick={handleReset} title='Сбросить все выбранное' label='Сбросить все выбранное'>Сброс</button>
    <button className='btn-small' onClick={handleSave} title='Сохранить локально в заметки' label='Сохранить локально в заметки'>В заметки</button>
    <button className='btn-small' onClick={handleSave} title='Сохранить локально в заметки' label='Сохранить локально в заметки'>
      Сортировать по цене
      {sortOrder && <span>{SORT_ORDER[sortOrder]}</span>}
    </button>
    {handleUseful && <button className='btn-small' onClick={handleUseful} title='Фильтр эффектов' label='Фильтр эффектов'>{useful}</button>}
    {/* <button className='btn btn--del' onClick={handleReset} title='Сбросить все выбранное' label='Сбросить все выбранное'>&nbsp;</button> */}
    {/* <button className='btn btn--save' onClick={handleSave} title='Сохранить локально в заметки' label='Сохранить локально в заметки'>&nbsp;</button> */}
  </div>
);
// ▲

export default HeaderList;