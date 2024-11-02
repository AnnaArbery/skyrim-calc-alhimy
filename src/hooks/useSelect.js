const useSelect = ({ max, useHookStore }) => {
  const { selected, add, remove, reset } = useHookStore();

  const handleSelect = item => {
    const hasSelected = selected.some(select => select.id === item.id);

    if (!item?.id) {
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
