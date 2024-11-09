import React, { ChangeEvent, MouseEvent } from 'react';

type HeaderListProps = {
  value: string;
  useful?: string;
  sortOrder: number | boolean;
  handlerSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handlerReset: () => void;
  handlerSave: () => void;
  handlerClear: () => void;
  handlerUseful?: () => void;
  handlerSort: ({ order }: { order: number | boolean | undefined }) => void;
};

const SORT_LIST_COST = ['', '▼', '▲'];

const HeaderList = ({
  value,
  useful,
  sortOrder,
  handlerSearch,
  handlerReset,
  handlerSave,
  handlerClear,
  handlerUseful,
  handlerSort
}: HeaderListProps) => {
  const handlerSortHeader = (e: MouseEvent<HTMLButtonElement>) => {
    handlerSort({ order: false });
  };

  return (
    <div className='selectors__subhead'>
      <input
        type='text'
        value={value}
        onChange={handlerSearch}
        className='selectors__input'
        placeholder='Поиск...'
      />
      <button className='btn btn--clear' onClick={handlerClear} title='Очистить поле'>
        Очистить
      </button>
      <button className='btn-small' onClick={handlerReset} title='Сбросить все выбранное'>
        Сброс
      </button>
      <button className='btn-small' onClick={handlerSave} title='Сохранить локально в заметки'>
        В заметки
      </button>
      <button className='btn-small' onClick={handlerSortHeader} title='Сортировать'>
        {!sortOrder && (
          <>
            По имени <span>▼</span>
          </>
        )}
        {!!sortOrder && (
          <>
            По цене <span>{SORT_LIST_COST[Number(sortOrder)]}</span>
          </>
        )}
      </button>
      {handlerUseful && (
        <button className='btn-small' onClick={handlerUseful} title='Фильтр эффектов'>
          {useful}
        </button>
      )}
    </div>
  );
};

export default HeaderList;
