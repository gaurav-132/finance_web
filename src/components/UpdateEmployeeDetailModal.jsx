import React, { memo, useCallback, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Modal from './Modal';
import InputBox from './InputBox';
import Button from './Button';
import SelectBox from './SelectBox';
import FileUploadBox from './FileUploadBox';
import UpdateEmployeeSchema from '../schemas/UpdateEmployeeSchema';

const UpdateEmployeeDetailModal = ({
    isOpen,
    onChange,
    modalWidth,
    submitDetails,
    height,
    initialValues
}) => {
    console.log("employee update re-render");

    const options = useMemo(() => [
        { value: '1', label: 'Haridwar' },
        { value: '2', label: 'Roorkee' },
    ], []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        console.log("Values", values);

        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            if (values[key] && values[key] instanceof File) {
                formData.append(key, values[key]);
            } else if (values[key]) {
                formData.append(key, values[key]);
            }
        });

        for (let pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }

        submitDetails(formData);
        setSubmitting(false);
        onChange(false);
    }, [submitDetails, onChange]);

    return (
        <Modal
            title={`Update Employee - ${initialValues.name}`}
            isOpen={isOpen}
            modalWidth={modalWidth}
            onChange={onChange}
            minHeight="350px"
            top="40%"
            height={height}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={UpdateEmployeeSchema}
                onSubmit={handleSubmit}
                validateOnBlur={false}
            >
                {({ isSubmitting }) => (
                    <Form className='px-4'>
                        <div className='flex mb-2 flex-wrap justify-center'>
                            <div className='mr-10'>
                                <Field
                                    id="aadhaarNo"
                                    name="aadhaarNo"
                                    type="text"
                                    label="Aadhaar No"
                                    as={InputBox}
                                />
                                <ErrorMessage name="aadhaarNo" component="div" className='text-red-500 text-sm' />
                            </div>
                            <div className='mr-10'>
                                <Field
                                    id="panNo"
                                    name="panNo"
                                    type="text"
                                    label="Pan No"
                                    as={InputBox}
                                />
                                <ErrorMessage name="panNo" component="div" className='text-red-500 text-sm' />
                            </div>
                            <div>
                                <Field
                                    id="allocatedLocationId"
                                    name="allocatedLocationId"
                                    label="Select Location"
                                    component={SelectBox}
                                    options={options}
                                    placeholder="Select an option"
                                />
                                <ErrorMessage name="allocatedLocationId" component="div" className='text-red-500 text-sm' />
                            </div>
                        </div>

                        <div className='mb-2 flex flex-wrap justify-center'>
                            <div className='mr-10'>
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
                            <div className='mr-10'>
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
                            <div>
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

export default memo(UpdateEmployeeDetailModal);
