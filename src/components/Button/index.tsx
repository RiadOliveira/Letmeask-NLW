import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
};

const Button: React.FC<ButtonProps> = ({ isOutlined = false, ...props }) => {
    return (
        <button
            className={`button ${isOutlined ? 'outlined' : ''}`}
            {...props}
        />
    );
};

export default Button;
