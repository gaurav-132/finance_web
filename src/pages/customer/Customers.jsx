import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCustomers } from '../../app/slices/customerSlice';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';

const Customers = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openAlertModal, setOpenAlertModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const {customers, status, total, page, limit} = useSelector((state) => state.customers);
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
        <div className="">
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Customers</h2>
            </div>
            <div className=''>
                {
                    status === 'pending' && 
                    <div className='border px-2 py-2 rounded text-sm font-bold text-white bg-yellow-400'>Loading...</div>
                }
                {
                    status === 'succeeded' && customers.length === 0 && 
                    <div className='border my-2 px-2 py-2 rounded text-sm font-bold text-white bg-red-600'>No Employees Found</div>
                }
                {
                    status === 'succeeded' && customers.length > 0 && (
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
                                                <Button
                                                    type='submit'
                                                    disabled={false}
                                                    onClick={() => changeModalStatus(employee)}
                                                    className='bg-[#F44336] py-1 text-white focus:ring-0 focus:outline-none w-full font-semibold'
                                                >
                                                    Edit
                                                </Button>
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