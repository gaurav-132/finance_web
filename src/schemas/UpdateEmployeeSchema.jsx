import * as Yup from 'yup';


const UpdateEmployeeSchema = Yup.object().shape({
  empId: Yup.string()
    .required('Employee ID is required'),
  
  markSheet: Yup.mixed()
    .required('Mark sheet is required')
    .test('fileSize', 'File too large', value => !value || (value && value.size <= 10 * 1024 * 1024)) // Max 2MB
    .test('fileType', 'Unsupported File Format', value => !value || ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)), 
    
  photo: Yup.mixed()
    .required('Photo is required')
    .test('fileSize', 'File too large', value => !value || (value && value.size <= 10 * 1024 * 1024)) // Max 2MB
    .test('fileType', 'Unsupported File Format', value => !value || ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)), 
  
  check: Yup.mixed()
    .required('Check is required')
    .test('fileSize', 'File too large', value => !value || (value && value.size <= 10 * 1024 * 1024)) // Max 2MB
    .test('fileType', 'Unsupported File Format', value => !value ||  ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)), // Example type
  
  aadhaarNo: Yup.string()
    .matches(/^\d{12}$/, 'Aadhaar number must be 12 digits')
    .required('Aadhaar number is required'),
  
  panNo: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number')
    .required('PAN number is required'),
  
  allocatedLocationId: Yup.number()
    .required('Allocated location  is required')
    .positive('Allocated location must be a positive number')
    .integer('Allocated location ID must be an integer'),
});

export default UpdateEmployeeSchema;
