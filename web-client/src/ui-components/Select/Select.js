import React from 'react';
import './Select.scss';

const Select = ({ name, valueList = [], handleSelect }) => (
    <select
        name={name}
        className='Select'
        defaultValue='default'
        onChange={(event) => event && event.target && handleSelect(event.target.value)}
    >
        <option value='default' disabled={true}>Wähle aus</option>
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
