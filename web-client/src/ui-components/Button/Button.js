import React from 'react';
import './Button.scss';

const Button = ({ shape = 'primary', children, ...props }) => (
    <button className={`Button Button--${shape}`} {...props}>{children}</button>
);

export default Button;
