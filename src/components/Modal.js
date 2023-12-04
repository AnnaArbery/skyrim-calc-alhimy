import React from 'react';
import { createPortal } from 'react-dom'

const Modal = ({coords, list}) => {
  return createPortal(
    <div className='modalHover' style={{left: coords.x, top: coords.y}}>
      {list.length > 0 && list.map(({id, name}) => <div key={id}>{name}</div>)}
    </div>, document.body)
}

export default Modal;