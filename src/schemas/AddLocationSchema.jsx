import * as Yup from 'yup';

const addLocationSchema = Yup.object().shape({
    locationName: Yup.string().required('Location Name is required')
});


export default addLocationSchema;