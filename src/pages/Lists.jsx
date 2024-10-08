import React, { useState } from 'react';
import List from '../components/List/List'
import Dropdown from '../components/Dropdown'
import Header from '../components/List/Header'
import Selected from '../components/List/Selected'
import useFilter from '../hooks/useFilter'
import useLocalStorage from '../hooks/useLocalStorage'
import useSelect from '../hooks/useSelect'
import { filterListByList, filterListById, getPropsFromComps, findByName } from '../assets/utilits'
import useComponentsStore from '../store/useComponentsStore';
import usePropsStore from '../store/usePropsStore';

import useHoverDropdown from '../hooks/useHoverDropdown';

const Lists = () => {
  const { components } = useComponentsStore();
  const { properties } = usePropsStore();
  
  const [ , setSavedFormulas ] = useLocalStorage('savedFormula', []);
  const [ statusSave, setStatusSave ] = useState('');

  const { dropdown, isShowDropdown, handleHover } = useHoverDropdown()

  const [ findComps, setSeachComp ] = useState('');
  const [ findProps, setSearchProps ] = useState(''); 
  const [ selectedComponents, handleSelectedComponents] = useSelect([], 3);
  const [ selectedProperties, handleSelectedProperties] = useSelect([], 5);
  const filteredComponents = useFilter(components, selectedProperties, filterListByList);
  const filteredProperties = useFilter(properties, getPropsFromComps(components, selectedComponents), filterListById);
  
  const handleReset = () => {
    handleSelectedComponents(null);
    handleSelectedProperties(null);
  }

  const handleSave = () => {
    setSavedFormulas(prev => [...prev, {
      id: +new Date(),
      comps: [...selectedComponents],
      props: [...selectedProperties]
    }]);

    handleReset();
    setStatusSave(true);

    setTimeout(() => {
      setStatusSave(false);
    }, 1500)
  }

  const handleSearch = (e, cb) => cb(e.target.value)

  return (
    <>
      <div className='selectors'>
        <Selected>
          {selectedComponents.length > 0 && <Selected.List
            title='Ингридиенты'
            list={components}
            selected={selectedComponents}
            handleClick={handleSelectedComponents}
          />}
          {selectedProperties.length > 0 && <Selected.List
            title='Эффекты'
            list={properties}
            selected={selectedProperties}
            handleClick={handleSelectedProperties}
          />}
        </Selected>
        {statusSave && <div className='status-save'>Сохранено в заметки</div>}
        <div className='grid selectors__grid'>
          <div className='selectors__row'>
            <div className='selectors__col'>
              <Header
                value={findComps}
                handler={e => handleSearch(e, setSeachComp)}
                handleReset={handleReset} handleSave={handleSave}
              />
              <List
                list={findByName(filteredComponents, findComps)}
                selected={selectedComponents}
                clickEvent={
                  id => {
                    setSeachComp('');
                    handleSelectedComponents(id)}
                }
                mouseEvent={{
                  cb: handleHover,
                  selectedSublist: id => filterListById(properties, getPropsFromComps(components, [id]))
                }}
              />
            </div>
            <div className='selectors__col'>
              <Header
                value={findProps}
                handler={e => handleSearch(e, setSearchProps)}
                handleReset={handleReset}
                handleSave={handleSave}
              />
              <List
                list={findByName(filteredProperties, findProps)}
                selected={selectedProperties}
                clickEvent={
                  id => {
                    setSearchProps('');
                    handleSelectedProperties(id)}
                }
                mouseEvent={{
                  cb: handleHover,
                  selectedSublist: id => filterListByList(components, [id])
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {isShowDropdown && <Dropdown coords={dropdown.coords} list={dropdown.list}/>}
    </>
  );
};

export default Lists;