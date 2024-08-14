import React from 'react';

const SelectBox = ({
    field,
    form,
    label,
    placeholder,
    options,
    ...props
}) => {
    // Access current value of the select box
    const value = field.value || ''; 

    return (
        <div className="mb-4">
            {label && (
                <label
                    className="
                        block 
                        text-gray-800 
                        text-sm 
                        font-medium 
                        mb-2 
                        text-left
                    "
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    {...field}
                    {...props}
                    value={value}  // Control value of the select box
                    placeholder={placeholder}
                    className="
                        w-[195px] 
                        px-4 
                        py-2 
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
                        ))
                    }
                </select>
            </div>

            {form.errors && form.errors[field.name] && form.touched && form.touched[field.name] && (
                <div className='text-red-500 text-sm mt-2'>{form.errors[field.name]}</div>
            )}
        </div>
    );
}

export default SelectBox;
