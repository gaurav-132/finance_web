import React, { useState } from 'react'
import Modal from './Modal'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import UpdateEmployeeSchema from '../schemas/UpdateEmployeeSchema'
import InputBox from './InputBox'
import Button from './Button'
import SelectBox from './SelectBox'
import FileUploadBox from './FileUploadBox'


const EmployeeDetailModal = ({
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
                title={`Update Employee ${initialValues.name}`}
                isOpen={isOpen}
                modalWidth={modalWidth}
                onChange={onChange}
                minHeigth="350px"
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={UpdateEmployeeSchema}
                    onSubmit={handleSubmit}
                >
                {({ isSubmitting }) => (
                    <Form className='px-4'>
                        <div className='flex justify-center'>
                            <div className='mr-10'>
                                <label htmlFor="aadhaarNo" className='block mb-1'>Aadhaar No</label>
                                <Field
                                    id="aadhaarNo"
                                    name="aadhaarNo"
                                    type="text"
                                    as={InputBox}
                                />
                                <ErrorMessage name="aadhaarNo" component="div" className='text-red-500 text-sm' />
                            </div>
                            <div className='mr-10'>
                                <label htmlFor="panNo" className='block mb-1'>Pan No</label>
                                <Field
                                    id="panNo"
                                    name="panNo"
                                    type="panNo"
                                    as={InputBox}
                                />
                                <ErrorMessage name="panNo" component="div" className='text-red-500 text-sm' />
                            </div>
                            <div className=''>
                                <label htmlFor="locationId" className='block mb-1'>Select Location</label>
                                <Field
                                    id="locationId"
                                    name="locationId"
                                    component={SelectBox}
                                    options={options}
                                    placeholder="Select an option"
                                />
                                <ErrorMessage name="location" component="div" className='text-red-500 text-sm' />
                            </div>
                            
                        </div>

                        <div className='mb-4 flex justify-center'>
                            <div className='mr-10 mb-4'>
                                <label htmlFor="markSheet" className='block mb-1'>Upload Marksheet</label>
                                <Field
                                    id="markSheet"
                                    name="markSheet"
                                    type="file"
                                    as={FileUploadBox}
                                />
                                <ErrorMessage name="markSheet" component="div" className='text-red-500 text-sm' />
                            </div>
                            <div className='mr-10'>
                                <label htmlFor="photo" className='block mb-1'>Upload Photo</label>
                                <Field
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    as={FileUploadBox}
                                />
                                <ErrorMessage name="photo" component="div" className='text-red-500 text-sm' />
                            </div>
                            <div className=''>
                                <label htmlFor="check" className='block mb-1'>Upload Check</label>
                                <Field
                                    id="check"
                                    name="check"
                                    type="file"
                                    as={FileUploadBox}
                                />
                                <ErrorMessage name="check" component="div" className='text-red-500 text-sm' />
                            </div>
                        </div>
                        <div className='text-center'>
                            <Button
                                type='submit'
                                disabled={isSubmitting}
                                className='bg-black text-white focus:ring-0 focus:outline-none w-[40%] py-2 font-semibold'>
                                {isSubmitting ? 'Updating...' : 'Update'}
                            </Button>
                        </div>
                    </Form>
                )}
                </Formik>
            </Modal>
        </div>
    )
}

export default EmployeeDetailModal