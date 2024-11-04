import { useState } from 'react';

const useHoverDropdown = () => {
  const [dropdown, setDropdown] = useState({});

  const handleHover = (e, id, subList) => {
    const coords = e.target.getBoundingClientRect();

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
