import React, {useState} from 'react';
import TitleList from './TitleList'
import Nav from './Nav'
import About from './About'
import Table from './Table'
import Notes from './Notes'
import Selectors from './Selectors'
import useFetch from '../hooks/useFetch.js'
import useSelect from '../hooks/useSelect.js'


const Content = () => {
  const [components] = useFetch('./store/alhimy.json');
  const [properties] = useFetch('./store/props.json');
  const [page, setPage] = useState('selectors');

  const [selectedComponents, handleSelectedComponents] = useSelect([], 3);
  const [selectedProperties, handleSelectedProperties] = useSelect([], 5);

  return (
    <>
      <div className='menu'>
        <div className='grid'>
          <Nav handlePage={setPage} page={page}/>
          <div className='menu__selected'>
            {selectedComponents.length > 0 &&
              <TitleList
                title='Ингридиенты'
                list={components}
                selected={selectedComponents}
                handleClick={handleSelectedComponents}
              />
            }
            {selectedProperties.length > 0 &&
              <TitleList
                title='Эффекты'
                list={properties}
                selected={selectedProperties}
                handleClick={handleSelectedProperties}
              />
            }
          </div>
        </div>
      </div>
      {page === 'selectors' &&
        <Selectors
          components={components}
          properties={properties}
          selectedComponents={selectedComponents}
          selectedProperties={selectedProperties}
          handleSelectedComponents={handleSelectedComponents}
          handleSelectedProperties={handleSelectedProperties}
        />
      }
      {page === 'table' && <Table components={components} properties={properties}/> }
      {page === 'notes' && <Notes components={components} properties={properties}/> }
      {page === 'about' && <About/> }
    </>
  )
}

export default Content;