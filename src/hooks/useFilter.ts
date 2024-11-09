import { useMemo, useRef } from 'react';
import { Item } from '@/types/Item';

const useFilter = (
  list: Item[],
  selected: string[],
  cb: (list: Item[], selected: string[]) => void
) => {
  const refCb = useRef<(list: Item[], selected: string[]) => void>();
  refCb.current = cb;

  return useMemo(
    () => (selected.length > 0 ? refCb.current(list, selected) : list),
    [list, selected]
  );
};

export default useFilter;
