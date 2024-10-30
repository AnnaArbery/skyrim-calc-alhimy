import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Cost = ({cost: intialCost, handlerSave, showButton}) => {
  const [cost, setCost] = useState(intialCost);

  const saveCost = () => {
    handlerSave(cost);
    toast.success('Цена изменена', {
      position: 'top-center',
      icon: false,
    });
  }

  return (
    <>
      <input type='text' name='cost' value={cost} onChange={e => setCost(e.target.value)} readOnly={!showButton}/>
      {showButton && <button className='btn btn--edit' onClick={saveCost} label='save'>&nbsp;</button>}
    </>
  );
};

export default Cost;