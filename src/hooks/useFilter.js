import { useMemo, useRef } from 'react';

const useFilter = (list, selected, cb) => {
  const refCb = useRef();
  refCb.current = cb;

  return useMemo(() => 
    (selected.length > 0)
      ? refCb.current(list, selected)
      : list,
  [list, selected]);  
}

export default useFilter;