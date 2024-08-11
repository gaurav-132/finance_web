import React from 'react';
import InputBox from '../../components/InputBox';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { loginUser } from '../../app/slices/authSlice';
import loginSchema from '../../schemas/loginSchema';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (values, { setSubmitting }) => {
        dispatch(loginUser(values))
            .unwrap()
            .then(() => {
                navigate('/admin/dashboard');
            })
            .catch((err) => {
                console.error("Login failed", err);
            })
            .finally(() => {
                setSubmitting(false);
        });
    };


    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
                <div className='text-center mb-6'>
                    <h2 className='text-2xl font-bold mb-2'>Sign In</h2>
                    <p className='text-gray-600'>Enter your mobile number and password to sign in.</p>
                </div>
                <Formik
                    initialValues={{ mobile: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                >
                {({ isSubmitting }) => (
                    <Form>
                        <div className='mb-4'>
                            <label htmlFor="mobile" className='block mb-1'>Mobile</label>
                            <Field
                                id="mobile"
                                name="mobile"
                                type="text" // Changed to text to avoid issues with leading zeros
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
                        <Button
                            type='submit'
                            disabled={isSubmitting}
                            className='bg-black text-white focus:ring-0 focus:outline-none w-full py-2 font-semibold'>
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </Form>
                )}
                </Formik>
            </div>
        </div>
    );
}

export default Login;
