import React from 'react'
import Modal from './Modal'
import InputBox from './InputBox';
import Button from './Button';
import addLocationSchema from '../schemas/AddLocationSchema'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createOrUpdateLocation } from '../app/slices/locationSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function CreateOrUpdateLocationModal({
    isModalOpen,
    onChange,
    modalWidth,
    height,
    submitDetails,
	location
}) {
	const dispatch = useDispatch();
	// console.log(location);
  const handleSubmit = async (values, {setSubmitting}) => {
	try {
		const response = await dispatch(createOrUpdateLocation(values)).unwrap();
		setSubmitting(false);
		onChange(false);
		toast.success(response.message, {
			position: "top=center",
			autoClose: 3000,
		});
	} catch (error){
		toast.success(error.message, {
			position: "top=center",
			autoClose: 3000,
		});
		setSubmitting(false);
	}
  };


  return (
    <Modal
        title="Add Location"
        isOpen={isModalOpen}
        modalWidth={modalWidth}
        onChange={onChange}
        minHeigth="350px"
        top="40%"
        height={height}    
    >
      <Formik
        initialValues={{
			id: location.id,
            locationName: location.locationName
        }}
        validationSchema={addLocationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}

      >

        {({isSubmitting}) => (
          <Form className='px-10'>
            <div className='flex mb-4'>
				<div className='mr-10 flex-1'>
					<label htmlFor="locationName" className='block mb-1'>Location Name</label>
					<Field
						id="locationName"
						name="locationName"
						type="text"
						as={InputBox}
					/>
					<ErrorMessage name="locationName" component="div" className='text-red-500 text-sm' />
				</div>				
            </div>
			<div className='text-center mt-5'>
				<Button
					type='submit'
					disabled={isSubmitting}
					className='bg-black text-white focus:ring-0 w-1/3 focus:outline-none py-2 font-semibold'
				>
					{isSubmitting ? 'Submitting...' : 'Submit'}
				</Button>
			</div>			

          </Form>
        )}

      </Formik>

    </Modal>
  )
}

export default CreateOrUpdateLocationModal