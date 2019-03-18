import React from 'react';
import './Text.scss';

const Text = ({ handleChange }) => (
    <div className='Text'>
        <input
            onChange={e => handleChange((e && e.target) ? e.target.value : null)}
        />
    </div>
);

export default Text;
