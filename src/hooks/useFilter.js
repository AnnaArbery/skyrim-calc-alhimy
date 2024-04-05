import {useMemo} from 'react';

const useFilter = (list, selected, cb) =>
  useMemo(() => 
    (selected.length > 0)
      ? cb(list, selected)
      : list,
  [list, selected, cb]);

export default useFilter;