import React from 'react';
import Radio from '../Radio/Radio';
import './Multi.scss';

const Multi = ({ itemList = [], selectedValue, handleSelect }) => (
    <div className='Multi'>
        {itemList.map(({ key, label, options }) => (
            <div className='Multi__item' key={key}>
                <div className='Multi__item__label'>{label}</div>
                <Radio
                    group={key}
                    itemList={options}
                    selectedValue={selectedValue ? selectedValue[key] : null}
                    handleSelect={value => handleSelect({ [key]: value })}
                />
            </div>
        ))}
    </div>
);

export default Multi;
