import React, { useState } from 'react';
import Modal from './Modal';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import UpdateEmployeeSchema from '../schemas/UpdateEmployeeSchema';
import InputBox from './InputBox';
import Button from './Button';
import SelectBox from './SelectBox';
import FileUploadBox from './FileUploadBox';


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
    

    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            if (values[key] instanceof File) {
                console.log(values[key])
                formData.append(key, values[key]);
            } else {
                formData.append(key, values[key]);
            }
        });

      
        submitDetails(formData);
        setSubmitting(false);
        onChange(false);
      };

    return (
        <Modal
            title={`Update Employee - ${initialValues.name}`}
            isOpen={isOpen}
            modalWidth={modalWidth}
            onChange={onChange}
            minHeigth="350px"
            top="40%"
        >
            <Formik
                initialValues={initialValues}
                validationSchema={UpdateEmployeeSchema}
                onSubmit={handleSubmit}
            >
            {({ isSubmitting }) => (
                <Form className='px-4'>
                    <div className='flex flex-wrap justify-center'>
                        <div className='mr-10 mb-4'>
                            <Field
                                id="aadhaarNo"
                                name="aadhaarNo"
                                type="text"
                                label="Aadhaar No"
                                as={InputBox}
                            />
                            <ErrorMessage name="aadhaarNo" component="div" className='text-red-500 text-sm' />
                        </div>
                        <div className='mr-10 mb-4'>
                            <Field
                                id="panNo"
                                name="panNo"
                                type="text" 
                                label="Pan No"
                                as={InputBox}
                            />
                            <ErrorMessage name="panNo" component="div" className='text-red-500 text-sm' />
                        </div>
                        <div className='mb-4'>
                            <Field
                                id="allocatedLocationId"
                                name="allocatedLocationId"
                                label="Select Location"
                                component={SelectBox}
                                options={options}
                                placeholder="Select an option"
                            />
                            <ErrorMessage name="locationId" component="div" className='text-red-500 text-sm' />
                        </div>
                    </div>

                    <div className='mb-4 flex flex-wrap justify-center'>
                        <div className='mr-10 mb-4'>
                            <Field name="markSheet">
                                {({ field, form }) => (
                                    <FileUploadBox
                                        id="markSheet"
                                        label="Upload markSheet"
                                        name="markSheet"
                                        {...field}
                                        error={form.errors.markSheet}
                                        touched={form.touched.markSheet}
                                    />
                                )}
                            </Field>
                        </div>
                        <div className='mr-10 mb-4'>
                            <Field name="photo">
                                {({ field, form }) => (
                                    <FileUploadBox
                                        id="photo"
                                        label="Upload Photo"
                                        name="photo"
                                        {...field}
                                        error={form.errors.photo}
                                        touched={form.touched.photo}
                                    />
                                )}
                            </Field>
                        </div>
                        <div className='mb-4'>
                            <Field name="check">
                                {({ field, form }) => (
                                    <FileUploadBox
                                        id="check"
                                        label="Upload check"
                                        name="check"
                                        {...field}
                                        error={form.errors.check}
                                        touched={form.touched.check}
                                    />
                                )}
                            </Field>
                        </div>
                    </div>
                    <div className='text-center'>
                        <Button
                            type='submit'
                            disabled={isSubmitting}
                            className='bg-black text-white focus:ring-0 focus:outline-none w-[40%] py-2 font-semibold'
                        >
                            {isSubmitting ? 'Updating...' : 'Update'}
                        </Button>
                    </div>
                </Form>
            )}
            </Formik>
        </Modal>
    );
}

export default EmployeeDetailModal;
