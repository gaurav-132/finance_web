import React from 'react';
import InputBox from '../../components/InputBox';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage, connect } from 'formik';
import { loginUser } from '../../app/slices/authSlice';
import loginSchema from '../../schemas/loginSchema';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';



const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const { message } = useSelector((state) => state.auth);

    console.log(message);
    
    const handleSubmit = (values, { setSubmitting, setErrors }) => {
        dispatch(loginUser(values))
            .unwrap() // Unwrap the promise to directly access the rejected value
            .then(() => {
                navigate('/admin/dashboard');
                toast.success("Logged in successfully", { position: "top-center" });
            })
            .catch((err) => {
                // Log the error object to inspect its structure
                console.log("Caught error in handleSubmit:", err);
    
                // Display the error message
                toast.error(err.message || "Login failed", {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "light",
                });
    
                // Optionally, set form errors using Formik's setErrors
                setErrors({ submit: err.message });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };
    


    return (
        <div className='flex items-start pt-24 justify-center h-screen bg-gray-100'>
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
