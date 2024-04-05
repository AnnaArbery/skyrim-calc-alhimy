import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import List from '../components/List/List'
import Modal from '../components/Modal'
import Header from '../components/List/Header'
import Selected from '../components/List/Selected'
import useFilter from '../hooks/useFilter.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
import {filterListByList, filterListById, getPropsFromComps, findByName} from '../assets/utilits.js'
import ComponentsStore from '../store/componentsStore.js';
import PropsStore from '../store/propsStore.js';
import useSelect from '../hooks/useSelect.js'

const Lists = observer(() => {
  const { components } = ComponentsStore;
  const { props: properties } = PropsStore;
  const [modal, setModal] = useState({});
  const [findComps, setSeachComp] = useState('');
  const [findProps, setSearchProps] = useState('');
  const [, setSavedFormulas] = useLocalStorage('savedFormula', []);
  const [statusSave, setStatusSave] = useState('');
  const [selectedComponents, handleSelectedComponents] = useSelect([], 3);
  const [selectedProperties, handleSelectedProperties] = useSelect([], 5);

  const filteredComponents = useFilter(components, selectedProperties, filterListByList);
  const filteredProperties = useFilter(properties, getPropsFromComps(components, selectedComponents), filterListById);

  const handleHover = (e, id, subList) => {
    const coords = e.target.getBoundingClientRect();

    const options = id
      ? {id: id, list: subList, coords: {x: coords.left, y: coords.top + coords.height + window.scrollY}}
      : {};
    setModal(options);
  }
  
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
                mouseEvent={{cb: handleHover, selectedSublist: id => filterListByList(components, [id]) }}
              />
            </div>
          </div>
        </div>
      </div>
      {modal.id && <Modal id={modal.id} coords={modal.coords} list={modal.list}/>}
    </>
  );
});

export default Lists;