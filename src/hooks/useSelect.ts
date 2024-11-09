import { IListState } from '@/types/IListState';

const useSelect = <T extends { id: string }>({
  max,
  useHookStore
}: {
  max: number;
  useHookStore: any;
}) => {
  const { selected, add, remove, reset }: IListState<T> = useHookStore();

  const handleSelect = (item: T) => {
    const hasSelected = selected.some(select => select.id === item.id);

    if (!item.id) {
      reset();
    } else if (!!selected.length && hasSelected) {
      remove(item);
    } else if (selected.length < max) {
      add(item);
    }
  };

  return {
    selected,
    handleSelect,
    reset
  };
};

export default useSelect;
