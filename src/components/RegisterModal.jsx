import React from 'react';
import Modal from './Modal';
import InputBox from './InputBox';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerUser } from '../app/slices/authSlice';
import registerSchema from '../schemas/registerSchema';
import { useNavigate } from 'react-router-dom';

const RegisterModal = ({ isOpen, modalWidth, onChange, height }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (values, { setSubmitting }) => {
        dispatch(registerUser(values))
        setSubmitting(false)
        onChange(false);
    };

    const isAdminOptions = [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' },
    ];

    return (
        <Modal
            title="Register"
            isOpen={isOpen}
            onChange={onChange}
            modalWidth={modalWidth}
            top="40%"
            height={height}
        >
            <Formik
                initialValues={{ firstName: '', lastName: '', mobile: '', password: '', isAdmin: false, isActive: true }}
                validationSchema={registerSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="px-10">
                        <div className='flex mb-4'>
                            <div className='mr-10 flex-1'>
                                <label htmlFor="firstName" className='block mb-1'>First Name</label>
                                <Field
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    as={InputBox}
                                />
                                <ErrorMessage name="firstName" component="div" className='text-red-500 text-sm' />
                            </div>
                            <div className='mr-10 flex-1'>
                                <label htmlFor="lastName" className='block mb-1'>Last Name</label>
                                <Field
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    as={InputBox}
                                />
                                <ErrorMessage name="lastName" component="div" className='text-red-500 text-sm' />
                            </div>
                            <div className='flex-1'>
                                <label htmlFor="mobile" className='block mb-1'>Mobile</label>
                                <Field
                                    id="mobile"
                                    name="mobile"
                                    type="text"
                                    as={InputBox}
                                />
                                <ErrorMessage name="mobile" component="div" className='text-red-500 text-sm' />
                            </div>
                        </div>
                        <div className='flex mb-4'>
                            <div className='mr-10 flex-1/2'>
                                <label htmlFor="password" className='block mb-1'>Password</label>
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    as={InputBox}
                                />
                                <ErrorMessage name="password" component="div" className='text-red-500 text-sm' />
                            </div>
                            <div className='flex-1'>
                                <label className='block mb-1'>Is Admin</label>
                                <div>
                                    {isAdminOptions.map(option => (
                                        <div className='inline-block mr-2' key={option.value}>
                                            <Field
                                                type="checkbox"
                                                name="isAdmin"
                                                id={`isAdmin-${option.value}`}
                                                value={option.value}
                                            />
                                            <label className='ml-1' htmlFor={`isAdmin-${option.value}`}>{option.label}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='text-center mt-5'>
                            <Button
                                type='submit'
                                disabled={isSubmitting}
                                className='bg-black text-white focus:ring-0 w-1/3 focus:outline-none py-2 font-semibold'
                            >
                                {isSubmitting ? 'Registering...' : 'Register'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default RegisterModal;
