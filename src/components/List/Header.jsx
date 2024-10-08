import React from 'react';

const HeaderList = ({value, handler, handleReset, handleSave, handleClear}) => (
  <div className='selectors__subhead'>
    <input type='text' value={value} onChange={handler} className='selectors__input' placeholder='Поиск...'/>
    <button className='btn btn--clear' onClick={handleClear} title='Очистить поле' label='Очистить поле'>очистить</button>
    <button className='btn btn--del' onClick={handleReset} title='Сбросить все выбранное' label='Сбросить все выбранное'>&nbsp;</button>
    <button className='btn btn--save' onClick={handleSave} title='Сохранить локально в заметки' label='Сохранить локально в заметки'>&nbsp;</button>
  </div>
);

export default HeaderList;