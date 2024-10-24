import { useState, useEffect, useMemo } from 'react';

const filtersList = {
  'filter.search': (item, {search}) => item.name.toLowerCase().includes(search.toLowerCase()),
  'filter.comps': (item, {filter}) => {
    for (let i = 0; i < item?.props?.length; i += 1 ) {
      if (filter.some(prop => prop.id === item.props[i])) {
        return true;
      }
    }
    return false
  },
  'filter.props': (item, {filter}) => filter.some(comp => comp?.props?.includes(item.id)),
  // 'filter.id': (item, {filter}) => {
  //   // console.log(item, filter, 'filter')
  //   // return filterListByList(filter, item);
  // }
}

const FILTER_SEARCH = 'filter.search';

const useFilter = ({list, selected, filters}) => {
  const [filtered, setFiltered] = useState(list || []);
  const [listFilters, setListFilters] = useState(filters);
  const [options, setOptions] = useState({
    search: '',
    filter: selected
  });
  

  const changeFilter = (option) => {
    setOptions(prev => ({...prev, ...option}))
  }

  const toggleFilter = (filters, filter, callback) => {

  }

  useEffect(() => {
    changeFilter({filter: selected});
    // if (selected.length) {
      
    // }
  }, [selected]);

  const doFilter = () => {
    
  }

  useEffect(() => {

    const isFilterSearch = listFilters.includes(FILTER_SEARCH);   


    if (!!options.search && !isFilterSearch) {      
      setListFilters(prev => [...prev, FILTER_SEARCH])
    }
    
    if (!options.search) {
      setListFilters(prev => prev.filter(filter => filter !== FILTER_SEARCH))
    }

// console.log(options.search, isFilterSearch, listFilters);

    // if (!options.filter.length) return;

    const filteredList = list.filter(item => {

      // for (let i = 0; i < filters.length; i += 1 ) {
      //   const filter = filters[i];
      //   if (!filters[i], item, filtersList[filter](item, options) ) return false;

      //   console.log(filters[i], item, filtersList[filter](item, options))
      // }
      // console.log(options.selected, filters, options)
      if (!options.filter.length && !options.search) return item;
      return filters.every(filter => filtersList[filter](item, options));

      // console.log(res, item, selected)

      // console.log(item)

      // console.log(listFilters, list)
      // listFilters.forEach(filter => {
      //   console.log(filter, item)
      // })


      // if (options.search !== '') return filtersList['filter.search'](item, options);
      // if (options.filter.length > 0 ) {
      //   return filtersList['filter.props'](item, options);
      //   // return filtersList['filter.id'](item, options);
      // }


      

      // return item;
    });

    // console.log(list.filter(filtersList['filter.name']('бе')))
    // console.log(filteredList, options, listFilters);

    setFiltered(filteredList)
  }, [list, options]);

  return {
    filtered,
    changeFilter,
    options
  }
}


export default useFilter;