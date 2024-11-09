import React, { useState, FC } from 'react';
import { toast } from 'react-toastify';

type CostProps = {
  cost: string;
  handlerSave: (cost: string) => void;
  showButton: boolean;
};

const Cost: FC<CostProps> = ({ cost: intialCost, handlerSave, showButton }) => {
  const [cost, setCost] = useState(intialCost);

  const saveCost = () => {
    handlerSave(cost);
    toast.success('Цена изменена', {
      icon: false
    });
  };

  return (
    <>
      <input
        type='text'
        name='cost'
        value={cost}
        onChange={e => setCost(e.target.value)}
        readOnly={!showButton}
      />
      {showButton && (
        <button className='btn btn--edit' onClick={saveCost} title='save'>
          &nbsp;
        </button>
      )}
    </>
  );
};

export default Cost;
