import React, { useState } from 'react';
import List from '../components/List/List'
import Header from '../components/List/Header'
import Selected from '../components/List/Selected'
import useFilterList from '../hooks/useFilterList'
import useSaveFormula from '../hooks/useSaveFormula';
import { filterListByList, filterListById, getPropsFromComps } from '../utilits'
import useComponentsStore from '../store/useComponentsStore';
import usePropsStore from '../store/usePropsStore';

import useSelect from '../hooks/useSelect'
import useSort from '../hooks/useSort';

const FILTER_USEFUL = ['Яды', 'Эффекты', 'Все'];

const Lists = () => {
  const { components } = useComponentsStore();
  const { properties } = usePropsStore();
  const [ useful, setUseful ] = useState(2);
  const { saveFormula } = useSaveFormula();

  const {
    selected: selectedComps,
    handleSelect: handleSelectComps,
    reset: resetComps
  } = useSelect({
    useHookStore: useComponentsStore,
    max: 3
  });

  const {
    selected: selectedProps,
    handleSelect: handleSelectProps,
    reset: resetProps
  } = useSelect({
    useHookStore: usePropsStore,
    max: 5
  });

  const {
    filtered: filteredComponents,
    changeOption: changeFilterComps,
    options: optionsComps
  } = useFilterList({
    list: components,
    selected: selectedProps,
    filters: {
      select: [ 'filter.comps', selectedProps ]
    }
  });

  const {
    filtered: filteredProperties,
    changeOption: changeFilterProps,
    options: optionsProps
  } = useFilterList({
    list: properties,
    selected: selectedComps,
    useful: useful < 2 ? useful : '',
    filters: {
      select: [ 'filter.props', selectedComps ],
      useful: [ 'filter.useful', useful < 2 ? useful : '' ]
    }
  });

  const [, searchComps = ''] = optionsComps.search;
  const [, searchProps = ''] = optionsProps.search;

  const {
    sortedList: sortedListComps,
    sortOrder: sortOrderComps,
    handlerOrderSort: handlerOrderSortComps
  } = useSort({list: filteredComponents});

  const {
    sortedList: sortedListProps,
    sortOrder: sortOrderProps,
    handlerOrderSort: handlerOrderSortProps
  } = useSort({list: filteredProperties});
  
  const handlerReset = () => {
    resetComps();
    resetProps();
    setUseful(2);
    handlerOrderSortComps({ order:0 })
    handlerOrderSortProps({ order: 0 })
  }

  const handlerSave = () => {
    saveFormula(selectedComps, selectedProps)
    handlerReset();
  }

  const handlerUseful = () => {
    setUseful(prev => (prev === FILTER_USEFUL.length - 1) ? 0 : prev + 1) 
  }

  return (
    <div className='selectors'>
      <Selected>
        {!!selectedComps.length && <Selected.List
          title='Ингредиенты'
          selected={selectedComps}
          handleClick={handleSelectComps}
        />}
        {!!selectedProps.length && <Selected.List
          title='Эффекты'
          selected={selectedProps}
          handleClick={handleSelectProps}
          sum={selectedProps.length && selectedProps.reduce((acc, item) => acc + Number(item.cost), 0)}
        />}
      </Selected>
      <div className='grid selectors__grid'>
        <div className='selectors__row'>
          <div className='selectors__col'>
            <Header
              value={searchComps}
              sortOrder={sortOrderComps}              
              handlerSearch={e => changeFilterComps({search: e.target.value})}
              handlerReset={handlerReset}
              handlerSave={handlerSave}
              handlerClear={() => changeFilterComps({search: ''})}
              handlerSort={handlerOrderSortComps}
            />
            <List
              list={sortedListComps}
              selected={selectedComps}
              handlerClick={item => handleSelectComps(item)}
              getSublist={id => filterListById(properties, getPropsFromComps(components, [id]))}
              sublistSelected={selectedProps}
              handlerClickSublist={item => handleSelectProps(item)}
            />
          </div>
          <div className='selectors__col'>
            <Header
              value={searchProps}
              useful={FILTER_USEFUL[useful] || FILTER_USEFUL[FILTER_USEFUL.length - 1] }
              sortOrder={sortOrderProps}              
              handlerSearch={e => changeFilterProps({search: e.target.value})}
              handlerReset={handlerReset}
              handlerSave={handlerSave}
              handlerClear={() => changeFilterProps({search: ''})}
              handlerUseful={handlerUseful}
              handlerSort={handlerOrderSortProps}
            />
            <List
              list={sortedListProps}
              selected={selectedProps}
              handlerClick={item => handleSelectProps(item)}
              getSublist={id => filterListByList(components, [id])}
              sublistSelected={selectedComps}
              handlerClickSublist={item => handleSelectComps(item)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lists;