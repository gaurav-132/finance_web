import * as Yup from 'yup';

const UpdateEmployeeSchema = Yup.object().shape({
  empId: Yup.string()
    .required('Employee ID is required'),

  markSheet: Yup.mixed()
    .nullable() 
    .required('Marksheet is required'),

  photo: Yup.mixed()
    .nullable() 
    .required('Photo is required'),

  check: Yup.mixed()
    .nullable() 
    .required('Check is required'),

  aadhaarNo: Yup.string()
    .matches(/^\d{12}$/, 'Aadhaar number must be 12 digits')
    .required('Aadhaar number is required'),

  panNo: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number')
    .required('PAN number is required'),

  allocatedLocationId: Yup.number()
    .required('Allocated location is required')
    .positive('Allocated location must be a positive number')
    .integer('Allocated location ID must be an integer'),
});

export default UpdateEmployeeSchema;
