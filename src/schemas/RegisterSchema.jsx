import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    mobile: Yup.string().required('Mobile number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    isAdmin: Yup.number(),
});

export default registerSchema;
