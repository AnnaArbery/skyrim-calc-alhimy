import { useState, useEffect, useRef } from 'react';

const useSort = ({ list }) => {
  const [sortedList, setSortedList] = useState(list);
  const [sortOrder, setSortOrder] = useState(0);
  const refSortHandler = useRef();
  const refSetSortedList = useRef();

  refSetSortedList.current = () => {
    const newList = ( sortOrder === 0 )
      ? [...list]
      : [...list].sort((a,b) => (sortOrder === 1) ? b.cost - a.cost : a.cost - b.cost);

    setSortedList(newList);
  }

  refSortHandler.current = () => {
    setSortOrder(prev => prev === 2 ? 0 : prev + 1);
  }

  useEffect(() => {
    refSetSortedList.current()
  }, [sortOrder, list])

  return { 
    sortedList,
    sortOrder,
    handlerOrderSort: refSortHandler.current
  };
}

export default useSort;