import React, { useState } from 'react'
import Modal from './Modal'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import UpdateEmployeeSchema from '../schemas/UpdateEmployeeSchema'
import InputBox from './InputBox'
import Button from './Button'
import SelectBox from './SelectBox'
import FileUploadBox from './FileUploadBox'



const CustomerDetailModal = ({
    isOpen,
    onChange,
    modalWidth,
    initialValues,
    submitDetails
}) => {
    
    const options = [
        { value: '1', label: 'Haridwar' },
        { value: '2', label: 'Roorkee' },
    ];

    console.log(initialValues);
    const handleSubmit = (values) => {
        submitDetails(values);
        onChange(false); // Close modal after submission
    }

    return (
        <div>
            <Modal
                title={`Update Employee`}
                isOpen={isOpen}
                modalWidth={modalWidth}
                onChange={onChange}
                minHeigth="350px"
            >
                <div>Hello Customer</div>
            </Modal>
        </div>
    )
}

export default CustomerDetailModal