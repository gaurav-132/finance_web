import React from 'react'

const InputBox = (props) => {
    return (
        <div>
            {
                props.label && (
                    <label
                        className="
                            block 
                            text-gray-700 
                            text-sm 
                            font-bold 
                            mb-2 
                            text-left
                            border-black
                        "
                    >
                        {props.label}
                    </label>
                ) 
}
            <input
                type={props.type} 
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                className="
                    w-full 
                    px-3 
                    py-2 
                    border 
                    border-black 
                    rounded-md 
                    shadow-sm 
                    focus:outline-none 
                    focus:ring-black-100 
                    focus:border-black 
                    focus:border-2 
                    sm:text-sm"

            />
        </div>
    )
}

export default InputBox;