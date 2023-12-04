import {useMemo} from 'react';

const useFilter = (list, selected, cb) => {
  const filteredList = useMemo(() => {
    return (selected.length > 0) ? cb(list, selected) : list;
  }, [list, selected, cb]);
  return filteredList;
}
export default useFilter;