import React from 'react';
import { useDispatch } from 'react-redux';
import Modal from './Modal';
import InputBox from './InputBox';
import Button from './Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createCustomer } from '../app/slices/customerSlice';
import { toast } from 'react-toastify';
import addCustomerSchema from '../schemas/AddCustomerSchema';
import FileUploadBox from './FileUploadBox';


const AddCustomerModal = ({ isOpen, modalWidth, onChange, height }) => {
  
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await dispatch(createCustomer(values)).unwrap();
      setSubmitting(false);
      onChange(false); // Close modal
      toast.success('Customer added successfully', {});
    } catch (error) {
      toast.error(error.message || 'An error occurred during registration', {});
      setSubmitting(false);
    }
  };

  

  return (
    <Modal
      title="Add Customer"
      isOpen={isOpen}
      onChange={onChange}
      modalWidth={modalWidth}
      top="10%"
      height={height}
    >
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          mobileNumber: '',
          aadhaarNumber: '',
          panNumber: '',
          occupation: '',
          permanentAddress: '',
          currentAddress: '',
          workLocation: '',
          addedBy: '',
        }}
        validationSchema={addCustomerSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Form className="px-10">
            <div className='flex mb-4'>
              <div className='mr-10 flex-1'>
                <label htmlFor="firstName" className='block mb-1'>First Name</label>
                <Field id="firstName" name="firstName" type="text" as={InputBox} />
                <ErrorMessage name="firstName" component="div" className='text-red-500 text-sm' />
              </div>
              <div className='flex-1'>
                <label htmlFor="lastName" className='block mb-1'>Last Name</label>
                <Field id="lastName" name="lastName" type="text" as={InputBox} />
                <ErrorMessage name="lastName" component="div" className='text-red-500 text-sm' />
              </div>
            </div>

            <div className='flex mb-4'>
              <div className='mr-10 flex-1'>
                <label htmlFor="mobileNumber" className='block mb-1'>Mobile Number</label>
                <Field id="mobileNumber" name="mobileNumber" type="text" as={InputBox} />
                <ErrorMessage name="mobileNumber" component="div" className='text-red-500 text-sm' />
              </div>
              <div className='flex-1'>
                <label htmlFor="aadhaarNumber" className='block mb-1'>Aadhaar Number</label>
                <Field id="aadhaarNumber" name="aadhaarNumber" type="text" as={InputBox} />
                <ErrorMessage name="aadhaarNumber" component="div" className='text-red-500 text-sm' />
              </div>
            </div>

            <div className='flex mb-4'>
              <div className='mr-10 flex-1'>
                <label htmlFor="panNumber" className='block mb-1'>PAN Number</label>
                <Field id="panNumber" name="panNumber" type="text" as={InputBox} />
                <ErrorMessage name="panNumber" component="div" className='text-red-500 text-sm' />
              </div>
              <div className='flex-1'>
                <label htmlFor="occupation" className='block mb-1'>Occupation</label>
                <Field id="occupation" name="occupation" type="text" as={InputBox} />
                <ErrorMessage name="occupation" component="div" className='text-red-500 text-sm' />
              </div>
            </div>

            {/* Additional fields for permanent/current address, work location, etc. */}
            <div className='mb-4'>
              <label htmlFor="permanentAddress" className='block mb-1'>Permanent Address</label>
              <Field id="permanentAddress" name="permanentAddress" type="text" as={InputBox} />
              <ErrorMessage name="permanentAddress" component="div" className='text-red-500 text-sm' />
            </div>

            <div className='mb-4'>
              <label htmlFor="currentAddress" className='block mb-1'>Current Address</label>
              <Field id="currentAddress" name="currentAddress" type="text" as={InputBox} />
              <ErrorMessage name="currentAddress" component="div" className='text-red-500 text-sm' />
            </div>

            <div className='mb-4'>
              <label htmlFor="workLocation" className='block mb-1'>Work Location</label>
              <Field id="workLocation" name="workLocation" type="text" as={InputBox} />
              <ErrorMessage name="workLocation" component="div" className='text-red-500 text-sm' />
            </div>


            {/* <div className='mb-4'>
              <label htmlFor="addedBy" className='block mb-1'>Added By</label>
              <Field id="addedBy" name="addedBy" type="text" as={InputBox} />
              <ErrorMessage name="addedBy" component="div" className='text-red-500 text-sm' />
            </div> */}
            <Field name="chequePhoto">
  {({ field, form }) => (
    <FileUploadBox
      id="chequePhoto"
      label="Upload Cheque Photo"
      name="chequePhoto"
      {...field}
      error={form.errors.chequePhoto}
      touched={form.touched.chequePhoto}
    />
  )}
</Field>


            <div className='text-center mt-5'>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='bg-black text-white focus:ring-0 w-1/3 focus:outline-none py-2 font-semibold'
              >
                {isSubmitting ? 'Adding...' : 'Add Customer'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddCustomerModal;
