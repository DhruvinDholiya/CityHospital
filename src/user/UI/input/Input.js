import React from 'react';
import { BaseInput } from './Input.style';

function Input({ type, name, id, className, placeholder, value, onChange, onBlur }) {
    return (
        <BaseInput
            type={type}
            name={name}
            className={className}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur} />
    );
}

export default Input;