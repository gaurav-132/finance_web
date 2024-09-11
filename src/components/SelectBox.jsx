import React from 'react';

const SelectBox = ({
    field,
    form,
    label,
    placeholder,
    options,
    ...props
}) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                {label}
                </label>
            )}
        <div className="relative">
            <select
                {...field}
                {...props}
                onChange={e => form.setFieldValue(field.name, e.target.value)}
                value={field.value} // Use field.value directly
                className="
                    w-[195px] 
                    px-4 
                    py-[10px] 
                    border 
                    border-gray-300 
                    rounded-md 
                    shadow-sm 
                sm:text-sm
                "
            >
                <option value="">{placeholder}</option>
                {options && options.length > 0 &&
                    options.map((data) => (
                    <option key={data.value} value={data.value}>
                        {data.label}
                    </option>
                ))}
            </select>
        </div>

        {form.errors && form.errors[field.name] && form.touched && form.touched[field.name] && (
            <div className='text-red-500 text-sm mt-2'>{form.errors[field.name]}</div>
        )}
        </div>
    );
};



export default SelectBox;