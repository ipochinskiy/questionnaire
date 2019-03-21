import React from 'react';
import './Textarea.scss';

const Textarea = ({ handleChange }) => (
    <div className='Textarea'>
        <textarea
            rows='3'
            onChange={e => handleChange((e && e.target) ? e.target.value : null)}
        >
        </textarea>
    </div>
);

export default Textarea;
