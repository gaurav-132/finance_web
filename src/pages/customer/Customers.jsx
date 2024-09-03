import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCustomers } from '../../app/slices/customerSlice';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputBox from '../../components/InputBox';

const Customers = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const{ status, total, page, limit, customers}= useSelector((state)=>state.customers);
    const [showFilter, setShowFilter] = useState(false);
    
    // const {customers} = useSelector((state) => state.customers);
    
    const filterData = {
        total:0,
        limit:10,
        page:1
    }

    useEffect(() => {
        dispatch(fetchAllCustomers(filterData))
    }, [dispatch]);

    const handlePageChange = (newPage) => {
        filterData.page = newPage;
        dispatch(fetchAllCustomers(filterData));
    };

    const handleSubmit = (values, {setSubmitting}) => {
        dispatch(fetchAllCustomers(values));
        setSubmitting(false); 
    }

    const clearData = (resetForm) => {
        const filterData = {
            total:0,
            limit:10,
            page:1,
            allocatedLocationId:0,
            employeeName:'',
        };
        dispatch(fetchAllCustomers(filterData));
        resetForm();
    }    

    return (
        <div className="h-full">
            <div className='bg-[#373737] rounded-md px-2 py-4 justify-between items-center'>
                <h2 className='text-white font-bold'>Customers</h2>
            </div>
            <div className=''>
            <div className='relative' style={{ paddingBottom: showFilter ? '0px' : 60 }}>
                <div className="mt-4" style={{ display: showFilter ? 'flex' : 'none' }}>
                    <Formik
                        initialValues={filterData}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, resetForm }) => (
                            <Form className=''>
                                <div className='flex w-full'>
                                    <div className='mr-10'>
                                        <Field
                                            id="name"
                                            name="name"
                                            type="text"
                                            label="User Name"
                                            as={InputBox}
                                        />
                                        <ErrorMessage name="aadhaarNo" component="div" className='text-red-500 text-sm' />
                                    </div>
                                </div>
                                <div>
                                    <div className='mr-10 mt-3'>
                                        <Button
                                            type='submit'
                                            disabled={isSubmitting}
                                            className='bg-blue-600 text-white focus:ring-0 focus:outline-none w-auto py-1 mr-4 font-semibold'
                                        >
                                            {isSubmitting ? 'Searching...' : 'Search'}
                                        </Button>
                                        <Button
                                            type='submit'
                                            disabled={isSubmitting}
                                            onClick={() => clearData(resetForm)}
                                            className='bg-red-600 text-white focus:ring-0 focus:outline-none w-auto py-1 mr-4 font-semibold'
                                        >
                                            Clear
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className='absolute top-0 right-0' style={{ marginTop: showFilter ? '0px' : '16px' }}>
                    <FontAwesomeIcon onClick={() => setShowFilter(!showFilter)} className='text-xl' icon="fa-solid fa-filter" />
                </div>
            </div>
                {
                    status === 'pending' && 
                    <div className='border px-2 py-2 rounded text-sm font-bold text-white bg-yellow-400'>Loading...</div>
                }
                {
                    status === 'succeeded' && customers?.length === 0 && 
                    <div className='border my-2 px-2 py-2 rounded text-sm font-bold text-white bg-red-600'>No Employees Found</div>
                }
                {
                    status === 'succeeded' && customers?.length > 0 && (
                        <div>
                            <Pagination
                                page={page}
                                limit={limit}
                                handlePageChange={handlePageChange}
                                total={total}
                            />
                            <table className='w-full border'>
                                <thead>
                                    <tr className='border-b'>
                                        <th className="py-2 border text-sm px-5 text-left">Id</th>
                                        <th className="py-2 border text-sm px-5 text-left">Name</th>
                                        <th className="py-2 border text-sm px-5 text-left">Contact No</th>
                                        <th className="py-2 border text-sm px-5 text-left">Occupation</th>
                                        <th className="py-2 border text-sm px-5 text-left">Aadhaar No</th>
                                        <th className="py-2 border text-sm px-5 text-left">Pan No</th>
                                        <th className="py-2 border text-sm px-5 text-right">#</th>
                                    </tr>
                                </thead>
                                <tbody className='overflow-y-scroll'>
                                    {customers.slice(0,10).map((customer, index) => (
                                        <tr className='border-b' key={index}>
                                            <td className="py-1 border text-sm px-5">{index+1}</td>
                                            <td className="py-1 border text-sm px-5">{customer.firstName} {customer.lastName}</td>
                                            <td className="py-1 border text-sm px-5">{customer.mobileNumber}</td>
                                            <td className="py-1 border text-sm px-5">{customer.occupation}</td>
                                            <td className="py-1 border text-sm px-5">{customer.aadhaarNumber}</td>
                                            <td className="py-1 border text-sm px-5">{customer.panNumber}</td>
                                            <td className="py-1 border text-sm px-5 text-right">
                                                {/* <Button
                                                    type='submit'
                                                    disabled={false}
                                                    // onClick={() => changeModalStatus(employee)}
                                                    className='bg-[#F44336] py-1 text-white focus:ring-0 focus:outline-none w-full font-semibold'
                                                >
                                                    Edit
                                                </Button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>)
                    }   
            </div>
        </div>
    )
}

export default Customers