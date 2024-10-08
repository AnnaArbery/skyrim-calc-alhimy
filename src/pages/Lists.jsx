import React, { useState } from 'react';
import List from '../components/List/List'
import Dropdown from '../components/Dropdown'
import Header from '../components/List/Header'
import Selected from '../components/List/Selected'
import useFilter from '../hooks/useFilter'
import useSelect from '../hooks/useSelect'
import useHoverDropdown from '../hooks/useHoverDropdown';
import useSaveFormula from '../hooks/useSaveFormula';
import { filterListByList, filterListById, getPropsFromComps, findByName } from '../assets/utilits'
import useComponentsStore from '../store/useComponentsStore';
import usePropsStore from '../store/usePropsStore';


const Lists = () => {
  const { components } = useComponentsStore();
  const { properties } = usePropsStore();
  
  const { isShowDropdown, dropdown, handleHover } = useHoverDropdown();
  const { statusSave, saveFormula } = useSaveFormula();

  const [ searchComp, setSearchComp ] = useState('');
  const [ searchProp, setSearchProp ] = useState(''); 
  const [ selectedComponents, handleSelectedComponents ] = useSelect([], 3);
  const [ selectedProperties, handleSelectedProperties ] = useSelect([], 5);
  const filteredComponents = useFilter(components, selectedProperties, filterListByList);
  const filteredProperties = useFilter(properties, getPropsFromComps(components, selectedComponents), filterListById);
  
  const handleReset = () => {
    handleSelectedComponents(null);
    handleSelectedProperties(null);
  }

  const handleSave = () => {
    saveFormula(selectedComponents, selectedProperties)
    handleReset();
  }

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
                value={searchComp}
                handler={e => setSearchComp(e.target.value)}
                handleReset={handleReset}
                handleSave={handleSave}
                handleClear={e => setSearchComp('')}
              />
              <List
                list={findByName(filteredComponents, searchComp)}
                selected={selectedComponents}
                clickEvent={
                  id => {
                    setSearchComp('');
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
                value={searchProp}
                handler={e => setSearchProp(e.target.value)}
                handleReset={handleReset}
                handleSave={handleSave}
                handleClear={e => setSearchProp('')}
              />
              <List
                list={findByName(filteredProperties, searchProp)}
                selected={selectedProperties}
                clickEvent={
                  id => {
                    setSearchProp('');
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