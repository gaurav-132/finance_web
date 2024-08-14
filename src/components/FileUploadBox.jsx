import React, { useState } from 'react';
import { useField } from 'formik';

const FileUploadBox = ({ label, ...props }) => {
    const [fileName, setFileName] = useState('');
    const [formikField, meta, helpers] = useField(props);

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            helpers.setValue(file); // Set file in Formik state
        } else {
            setFileName(''); // Clear filename if no file selected
            helpers.setValue(null); // Clear file from Formik state
        }
    };

    return (
        <div className="mb-4">
            {label && (
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
                    {label}
                </label>
            )}
            <div className="relative">
                {/* Hidden file input */}
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="
                        absolute inset-0 
                        opacity-0 
                        cursor-pointer
                    "
                />
                {/* Custom overlay */}
                <div className="
                    w-[195px] 
                    h-[36px]
                    px-3 
                    py-2 
                    border 
                    border-black 
                    rounded-md 
                    shadow-sm 
                    flex 
                    items-center 
                    justify-center 
                    text-gray-500
                    bg-gray-100
                    cursor-pointer
                ">
                    {
                        fileName ?  
                        <span style={{ fontSize: 10}}>{fileName}</span>
                        :
                        <span className="text-sm">{'Upload File'}</span>
                    }
                </div>
            </div>
        </div>
    );
}

export default FileUploadBox;
