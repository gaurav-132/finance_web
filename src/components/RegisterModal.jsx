import React from 'react';
import Modal from './Modal';
import InputBox from './InputBox';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerUser } from '../app/slices/authSlice';
import registerSchema from '../schemas/registerSchema';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers } from '../app/slices/userSlice';
import { toast } from 'react-toastify';

const RegisterModal = ({ isOpen, modalWidth, onChange, height, filterData }) => {
    const dispatch = useDispatch();
    console.log("Redring register modal")
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            console.log(values);
            const response = await dispatch(registerUser(values)).unwrap();
            setSubmitting(false);
            
            onChange(false);
            dispatch(fetchAllUsers(filterData));
            toast.success(response.message, {
                position: "top-center",
                autoClose: 3000,
            });
        } catch (error) {   
            toast.error(error.message || "An error occurred during registration", {
                position: "top-center",
                autoClose: 3000,
            });
    
            setSubmitting(false);
        }
    };

    const isAdminOptions = [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' },
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
                initialValues={{ 
                    firstName: '', 
                    lastName: '', 
                    mobile: '', 
                    password: '', 
                    isAdmin: 0, 
                }}
                validationSchema={registerSchema}
                onSubmit={handleSubmit}
                validateOnChange={true}  
                validateOnBlur={false}    // Disable validation on field blur
            >
                {({ isSubmitting }) => (
                    <Form className="px-10">
                        {/* Input fields for user registration */}
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

                        {/* Password input */}
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

                            {/* Radio button group for isAdmin */}
                            <div className='flex-1'>
                                <label className='block mb-1'>Is Admin</label>
                                <div>
                                    {isAdminOptions.map(option => (
                                        <div className='inline-block mr-4' key={option.value}>
                                            <label className='ml-1'>
                                                <Field
                                                    type="radio"
                                                    name="isAdmin"
                                                    id={`isAdmin-${option.value}`}
                                                    value={String(option.value)}  
                                                />
                                                &nbsp;&nbsp;{option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <ErrorMessage name="isAdmin" component="div" className='text-red-500 text-sm' />
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
