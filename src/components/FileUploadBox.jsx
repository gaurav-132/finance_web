import React, { useState, useRef, useEffect } from 'react';
import { useField } from 'formik';
import Button from './Button';

const FileUploadBox = ({ label, error, touched, ...props }) => {
    const [fileName, setFileName] = useState('');
    const [showFileInput, setShowFileInput] = useState(true);
    const fileInputRef = useRef(null);
    const [field, meta, helpers] = useField(props);

    useEffect(() => {
        if (field.value && field.value instanceof File) {
            console.log("first time")
            setFileName(field.value.name);
            setShowFileInput(false);
        } else {
            setFileName('');
            setShowFileInput(true);
        }
    }, [field.value]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            console.log("after first time")
            setFileName(selectedFile.name);
            setShowFileInput(false);
            helpers.setValue(selectedFile); // Immediately update Formik's value
            helpers.setTouched(true); // Mark the field as touched for validation
        }
    };

    const handleRemoveFile = () => {
        setFileName('');
        setShowFileInput(true);
        helpers.setValue(''); // Reset Formik's value
        helpers.setTouched(true); // Mark the field as touched
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input field
        }
    };

    const handleViewFile = () => {
        if (field.value instanceof File) {
            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = reader.result;
                if (dataUrl) {
                    const newTab = window.open();
                    newTab.document.write(`<img src="${dataUrl}" style="width:50%; height:80%; margin:auto; display:flex;" />`);
                    newTab.document.close();
                }
            };
            reader.readAsDataURL(field.value);
        }
    };

    return (
        <div className="mb-4">
            {label && (
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                    {label}
                </label>
            )}
            {showFileInput ? (
                <div className="relative">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange} // Change this to onChange instead of onInput
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="w-[195px] h-[36px] px-3 py-2 border border-black rounded-md shadow-sm flex items-center justify-center text-gray-500 bg-gray-100 cursor-pointer">
                        {fileName ? (
                            <span style={{ fontSize: 10 }}>{fileName}</span>
                        ) : (
                            <span className="text-sm">Upload File</span>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex w-[195px]">
                    <Button
                        onClick={handleViewFile}
                        type='button'
                        className="bg-blue-500 py-[5px] hover:bg-blue-700 text-white font-bold px-4 rounded"
                    >
                        View
                    </Button>
                    <Button
                        onClick={handleRemoveFile}
                        type='button'
                        className='bg-red-500 py-[5px] hover:bg-red-700 text-white font-bold px-4 rounded ml-2'
                    >
                        Remove
                    </Button>
                </div>
            )}
            {touched && error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
            )}
        </div>
    );
};

export default FileUploadBox;
