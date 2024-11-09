import { useState, MouseEvent } from 'react';
import { Item } from '@/types/Item';

const useHoverDropdown = () => {
  const [dropdown, setDropdown] = useState({});

  const handleHover = (e: MouseEvent, id: string, subList: Item[]) => {
    const target = e.target as HTMLButtonElement;
    const coords = target.getBoundingClientRect();

    const options = id
      ? {
          id,
          list: subList,
          coords: {
            x: coords.left,
            y: coords.top + coords.height + window.scrollY
          }
        }
      : {};
    setDropdown(options);
  };

  return {
    isShowDropdown: !!dropdown.id,
    dropdown,
    handleHover
  };
};

export default useHoverDropdown;
