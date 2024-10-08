import { useState } from 'react';

const useHoverDropdown = () => {
  const [modal, setModal] = useState({});

  const handleHover = (e, id, subList) => {
    const coords = e.target.getBoundingClientRect();

    const options = id
      ? {id, list: subList, coords: {x: coords.left, y: coords.top + coords.height + window.scrollY}}
      : {};
    setModal(options);
  }

  return {
    isShow: !!modal.id,
    modal,
    setModal,
    handleHover
  }
}

export default useHoverDropdown;