import React from 'react';

const InputBox = ({ label, ...props }) => (
    <div>
        {label && (
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                {label}
            </label>
        )}
        <input
            {...props}
            className="w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-black-100 focus:border-black focus:border-2 sm:text-sm"
        />
    </div>
);

export default InputBox;
