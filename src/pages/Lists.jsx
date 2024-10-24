import React, { useState } from 'react';
import List from '../components/List/List'
import Header from '../components/List/Header'
import Selected from '../components/List/Selected'
import useFilter from '../hooks/useFilter'
// import useSelect from '../hooks/useSelect0'
import useSaveFormula from '../hooks/useSaveFormula';
import { filterListByList, filterListById, getPropsFromComps } from '../utilits'
import useComponentsStore from '../store/useComponentsStore';
import usePropsStore from '../store/usePropsStore';

import useSelect from '../hooks/useSelect'

const FILTER_USEFUL = ['Яды', 'Эффекты', 'Все']

const Lists = () => {
  const { components } = useComponentsStore();
  const { properties } = usePropsStore();
  const [ useful, setUseful ] = useState(2);
  // const [sortComps, setSortComps] = useState(2)
  // const [sortProps, setSortProps] = useState(2)
  
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

  // const [ searchComp, setSearchComp ] = useState('');
  // const [ searchProp, setSearchProp ] = useState('');

  const {
    filtered: filteredComponents,
    changeOption: changeFilterComps,
    options: optionsComps
  } = useFilter({
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
  } = useFilter({
    list: properties,
    selected: selectedComps,
    useful: useful < 2 ? useful : '',
    filters: {
      select: [ 'filter.props', selectedComps ],
      useful: [ 'filter.useful', useful < 2 ? useful : '' ]
    }
  });
  
  const handleReset = () => {
    resetComps();
    resetProps();
  }

  const handleSave = () => {
    saveFormula(selectedComps, selectedProps)
    handleReset();
  }

  const handleUseful = () => {
    setUseful(prev => prev === 2 ? 0 : prev + 1) 
  }

  return (

    <div className='selectors'>
      {JSON.stringify(optionsComps)}
      <br/>
      {JSON.stringify(optionsProps)}
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
        />}
      </Selected>
      <div className='grid selectors__grid'>
        <div className='selectors__row'>
          <div className='selectors__col'>
            <Header
              value={optionsComps?.search[1]}
              // handler={e => setSearchComp(e.target.value)}
              handler={e => changeFilterComps({search: e.target.value})}
              handleReset={handleReset}
              handleSave={handleSave}
              // handleClear={() => setSearchComp('')}
              handleClear={() => changeFilterComps({search: ''})}
            />
            <List
              list={filteredComponents}
              selected={selectedComps}
              clickEvent={
                (item) => {
                  // setSearchComp('');
                  handleSelectComps(item)
                }
              }
              getSublist={id => filterListById(properties, getPropsFromComps(components, [id]))}
            />
          </div>
          <div className='selectors__col'>
            <Header
              value={optionsProps?.search[1]}
              // handler={e => setSearchProp(e.target.value)}
              handler={e => changeFilterProps({search: e.target.value})}
              handleReset={handleReset}
              handleSave={handleSave}
              // handleClear={() => setSearchProp('')}
              handleClear={() => changeFilterProps({search: ''})}
              handleUseful={handleUseful}
              useful={FILTER_USEFUL[useful] || FILTER_USEFUL[FILTER_USEFUL.length - 1] }
            />
            <List
              list={filteredProperties}
              selected={selectedProps}
              clickEvent={
                (item) => {
                  // setSearchProp('');
                  handleSelectProps(item)
                }
              }
              getSublist={id => filterListByList(components, [id])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lists;