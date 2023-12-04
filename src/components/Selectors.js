import React, {useState} from 'react';
import CardList from './CardList'
import Modal from './Modal'
import HeaderList from './HeaderList'
import useFilter from '../hooks/useFilter.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
import {filterListByList, filterListById, getPropsFromComps, findByName} from '../assets/utilits'



const Selectors = ({components, properties, selectedComponents, selectedProperties, handleSelectedComponents, handleSelectedProperties}) => {
  const [modal, setModal] = useState({});
  const [findComps, setFindComps] = useState('');
  const [findProps, setFindProps] = useState('');
  const [, setSavedFormulas] = useLocalStorage('savedFormula', []);
  const [statusSave, setStatusSave] = useState('');

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

  const handlerFinder = (e, cb) => cb(e.target.value)

  return (
    <>
      <div className='selectors'>
        {statusSave && <div className='status-save'>Сохранено в заметки</div>}
        <div className='grid selectors__grid'>
          <div className='selectors__row'>
            <div className='selectors__col'>
              <HeaderList value={findComps} handler={e => handlerFinder(e, setFindComps)} handleReset={handleReset} handleSave={handleSave}/>
              <CardList
                list={findByName(filteredComponents, findComps)}
                selected={selectedComponents}
                clickEvent={
                  id => {
                    setFindComps('');
                    handleSelectedComponents(id)}
                }
                mouseEvent={{cb: handleHover, selectedSublist: id => filterListById(properties, getPropsFromComps(components, [id])) }}
              />
            </div>
            <div className='selectors__col'>
              <HeaderList value={findProps} handler={e => handlerFinder(e, setFindProps)} handleReset={handleReset} handleSave={handleSave}/>
              <CardList
                list={findByName(filteredProperties, findProps)}
                selected={selectedProperties}
                clickEvent={
                  id => {
                    setFindProps('');
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
  )
}

export default Selectors;