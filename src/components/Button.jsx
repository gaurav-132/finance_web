import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', disabled=false }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-4 rounded-md text-white font-semibold focus:outline-none ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
