import { useState, useEffect, useRef } from 'react';

const filtersList = {
  'filter.search': (item, {search: [, value]}) => item.name.toLowerCase().includes(value.toLowerCase()),
  'filter.useful': (item, {useful: [, value]}) => Number(item.type) === value,
  'filter.comps': (item, {select: [, value]}) => {
    if (!item.props) return false;

    for (let i = 0; i < item.props.length; i += 1 ) {
      if (value.some(prop => prop.id === item.props[i])) {
        return true;
      }
    }
    return false
  },
  'filter.props': (item, {select: [, value]}) => value.some(comp => comp?.props?.includes(item.id)),
}

const FILTER_DEFAULT = {
  search: [ 'filter.search', '' ]
};

const useFilter = ({list, selected = [], useful = false, filters}) => {
  const [filtered, setFiltered] = useState(list || []);
  const [options, setOptions] = useState({
    ...FILTER_DEFAULT,
    ...filters
  });
  const refChangeOption = useRef();

  refChangeOption.current = (option) => {
    const [name, value] = Object.entries(option).flat();

    setOptions(prev => {
      if (!prev[name]) return { ...prev };

      const [ filtername ] = prev[name];
      
      return {...prev, [name]: [filtername, value]}
    })
  }

  useEffect(() => {
    refChangeOption.current({select: selected});
  }, [selected]);

  useEffect(() => {
    refChangeOption.current({useful});
  }, [useful]);

  useEffect(() => {

    const currentFilters = Object.keys(options).reduce((acc, option) => {

      const [name, value] = options[option];

      if (value.length || typeof value === 'number' ) acc.push(name)
      return acc;   
    }, []);

    if (!currentFilters.length) {
      setFiltered(list);
      return;
    }

    const filteredList = list.filter(item => {

      for (let i = 0; i < currentFilters.length; i += 1 ) {
        const namefilter = currentFilters[i];
        if (!filtersList[ namefilter ](item, options)) return false;       
      }      

      return true;
    });

    setFiltered(filteredList)
  }, [list, options]);

  return {
    filtered,
    changeOption: refChangeOption.current,
    options
  }
}

export default useFilter;