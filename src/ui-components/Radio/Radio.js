import React from 'react';
import './Radio.scss';

const Radio = ({ group, itemList = [], selectedValue, handleSelect }) => (
    <div className='Radio'>
        {itemList.map((item) =>
            <label className='Radio__item' key={item.value}>
                <input
                    className='Radio__value'
                    type='radio'
                    name={group}
                    checked={item.value === selectedValue}
                    onChange={() => handleSelect(item.value)}
                />
                <div className="Radio__checkmark"></div>
                <span className='Radio__label'>{item.label}</span>
            </label>
        )}
    </div>
);

export default Radio;
