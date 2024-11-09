import { useState, useEffect, useRef, FC } from 'react';

const useSort = <T extends { cost: string }>({ list }: { list: T[] }) => {
  const [sortedList, setSortedList] = useState(list);
  const [sortOrder, setSortOrder] = useState<number | boolean>(0);
  const refSortHandler = useRef<({ order }: { order: number | boolean | undefined }) => void>();
  const refSetSortedList = useRef<() => void>();

  refSetSortedList.current = () => {
    const newList =
      sortOrder === 0
        ? [...list]
        : [...list].sort((a, b) => {
            return sortOrder === 1
              ? Number(b.cost) - Number(a.cost)
              : Number(a.cost) - Number(b.cost);
          });

    setSortedList(newList);
  };

  refSortHandler.current = ({ order = false }) => {
    if (order !== false) {
      setSortOrder(order);
      return;
    }

    setSortOrder(prev => (prev === 2 ? 0 : Number(prev) + 1));
  };

  useEffect(() => {
    refSetSortedList.current();
  }, [sortOrder, list]);

  return {
    sortedList,
    sortOrder,
    handlerOrderSort: refSortHandler.current
  };
};

export default useSort;
