import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    mobile: yup.string().matches(/^\d{10}$/, "Mobile number must be exactly 10 digits").required("Mobile number is required"),
    password: yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
});

export default loginSchema;