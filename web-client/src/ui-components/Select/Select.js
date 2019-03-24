import React from 'react';
import './Select.scss';

const Select = ({ name, valueList = [], handleSelect }) => (
    <select
        name={name}
        className='Select'
        defaultValue={valueList[0]}
        onChange={(event) => event && event.target && handleSelect(event.target.value)}
    >
        {valueList.map(value => (
            <option
                key={value}
                value={value}
            >
                {value}
            </option>
        ))}
    </select>
);

export default Select;
