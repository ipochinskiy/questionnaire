import React from 'react';
import './Select.scss';

const Select = ({ name, valueList = [], handleSelect }) => (
    <select
        name={name}
        className='Select'
        defaultValue={valueList[0]}
    >
        {valueList.map(value => (
            <option
                key={value}
                value={value}
                onClick={() => handleSelect(value)}
            >
                {value}
            </option>
        ))}
    </select>
);

export default Select;
