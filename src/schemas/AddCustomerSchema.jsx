import * as yup from 'yup';

const addCustomerSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    mobileNumber: yup.string()
      .required('Mobile Number is required')
      .matches(/^[0-9]+$/, 'Mobile Number must be a number'),
    aadhaarNumber: yup.string().required('Aadhaar Number is required'),
    panNumber: yup.string().required('PAN Number is required'),
    occupation: yup.string().required('Occupation is required'),
  });

  export default addCustomerSchema;