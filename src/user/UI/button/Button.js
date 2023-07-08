import React from 'react';
import {OutlinedButton, PrimaryButton, SecondaryButton } from './Button.style';

function Button({ children, type, btnDisabled=false, classes, btnType, path, udf}) {
    const checkButtonType = () => {
        switch (type) {
            case 'primary':
                return PrimaryButton;
            case 'secondary':
                return SecondaryButton;
            case 'outlined':
                return OutlinedButton;
            default:
                return PrimaryButton;

        }
    }

    const BaseButton = checkButtonType()
    return (
        <BaseButton onClick={udf} to={path} as={btnType} className={classes} disabled={btnDisabled}> {children}</BaseButton>
    );
}

export default Button;