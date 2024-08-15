import React, { useState, useRef, useEffect } from 'react';
import { useField } from 'formik';
import Button from './Button';

const FileUploadBox = ({ label, error, touched, ...props }) => {
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const [showFileInput, setShowFileInput] = useState(true);
    const fileInputRef = useRef(null);
    const [field, meta, helpers] = useField({
        ...props,
        validate: (value) => {
        if (value instanceof File) {
            return undefined; 
        }
        if (!value) {
            return 'Required';
        }
        return undefined; 
        },
        validateOnBlur: true, 
        validateOnChange: true,
    });

    useEffect(() => {
        if (field.value && field.value instanceof File) {
            setFileName(field.value.name);
            setFile(field.value);
            setShowFileInput(false);
            helpers.setTouched(false); 
        } else {
            setFileName('');
            setFile(null);
            setShowFileInput(true);
        }
    }, [field.value]);

    const handleFileChange = (event) => {
        console.log("File input changed");
        console.log(event.target.files[0]); 
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name);
            setFile(selectedFile);
            setShowFileInput(false);
            helpers.setValue(selectedFile);
            helpers.setTouched(false); // Clear touched state when file is uploaded
        }
    };

    const handleViewFile = () => {
        if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result;
            if (dataUrl) {
                const newTab = window.open();
                newTab.document.write(`<img src="${dataUrl}" style="width:50%; height:80%; margin:auto; display:flex;" />`);
                newTab.document.close(); 
            } else {
                console.error('Failed to read file as data URL');
            }
        };
        reader.onerror = (error) => {
            console.error('FileReader error:', error);
        };
        reader.readAsDataURL(file); 
        } else {
        console.error('No file selected or file is not an instance of File');
        }
    };

    const handleRemoveFile = () => {
        setFile('');
        setFileName('');
        setShowFileInput(true);
        helpers.setValue('');
        helpers.setTouched(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
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
                        onInput={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onBlur={() => helpers.setTouched(true)}
                        {...field}
                        />
                    {/* <input
                        type="file"
                        ref={fileInputRef}
                        onInput={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        value={file || null} 
                        onBlur={() => helpers.setTouched(true)}
                        {...field}
                    /> */}
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
                        disabled={!file}
                        className="bg-blue-500 py-[5px] hover:bg-blue-700 text-white font-bold px-4 rounded"
                    >
                        View
                    </Button>
                    <Button
                        onClick={handleRemoveFile}
                        type='button'
                        label="Remove"
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