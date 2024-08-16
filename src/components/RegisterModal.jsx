import React, { useState } from 'react';
import Modal from './Modal';
import InputBox from './InputBox';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerUser } from '../app/slices/authSlice';
import registerSchema from '../schemas/registerSchema';
import { useNavigate } from 'react-router-dom';

const RegisterModal = ({ isOpen, modalWidth , onChange}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);

        dispatch(registerUser(values))
            .unwrap()
            .then(() => {
                navigate('/admin/dashboard');
            })
            .catch((err) => {
                console.error("Registration failed", err);
            })
            .finally(() => {
                setSubmitting(false);
            });

            onChange(false);

    };

    
    return (
        <Modal 
        title="Register" 
        isOpen={isOpen} 
        onChange={onChange} 
        modalWidth={modalWidth}
        top="55%"
        minHeight="650px"
        >
            <Formik
                initialValues={{ firstName: '', lastName: '', mobile: '', password: '', isAdmin: false, isActive: true }}
                validationSchema={registerSchema}
                onSubmit={handleSubmit}

            >
                {({ isSubmitting }) => (
                    <Form  className="px-10">
                        <div className='mb-4'>
                            <label htmlFor="firstName" className='block mb-1'>First Name</label>
                            <Field
                                id="firstName"
                                name="firstName"
                                type="text"
                                as={InputBox}
                            />
                            <ErrorMessage name="firstName" component="div" className='text-red-500 text-sm' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="lastName" className='block mb-1'>Last Name</label>
                            <Field
                                id="lastName"
                                name="lastName"
                                type="text"
                                as={InputBox}
                            />
                            <ErrorMessage name="lastName" component="div" className='text-red-500 text-sm' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="mobile" className='block mb-1'>Mobile</label>
                            <Field
                                id="mobile"
                                name="mobile"
                                type="text"
                                as={InputBox}
                            />
                            <ErrorMessage name="mobile" component="div" className='text-red-500 text-sm' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="password" className='block mb-1'>Password</label>
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                as={InputBox}
                            />
                            <ErrorMessage name="password" component="div" className='text-red-500 text-sm' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="isAdmin" className='block mb-1'>Is Admin</label>
                            <Field
                                className="items-start" 
                                id="isAdmin"
                                name="isAdmin"
                                type="checkbox"
                                as={InputBox}
                            />
                            <ErrorMessage name="isAdmin" component="div" className='text-red-500 text-sm' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="isActive" className='block mb-1'>Is Active</label>
                            <Field
                                id="isActive"
                                name="isActive"
                                type="checkbox"
                                as={InputBox}
                            />
                            <ErrorMessage name="isActive" component="div" className='text-red-500 text-sm' />
                        </div>
                        <Button
                            type='submit'
                            disabled={isSubmitting}
                            className='bg-black text-white focus:ring-0 focus:outline-none w-full py-2 font-semibold'>
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default RegisterModal;
