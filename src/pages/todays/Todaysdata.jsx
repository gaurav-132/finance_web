import React, { useEffect, useState } from 'react'
import Pagination from '../../components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form, Formik } from 'formik';
import InputBox from '../../components/InputBox';
import SelectBox from '../../components/SelectBox';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployees } from '../../app/slices/employeeSlice';

function Todaysdata() {
    

    const dispatch = useDispatch();
    const { employees, total, limit, page, status, error, updateResponse } = useSelector((state) => state.employees);

   
    const [showFilter, setShowFilter] = useState(false);
    const filterData = {
        total,
        limit,
        page,
        allocatedLocationId:0,
        employeeName:'',
    }
    useEffect(() => {
        dispatch(fetchAllEmployees(filterData));
    }, [dispatch]);

    const handlePageChange = (newPage) => {
        filterData.page = newPage;
        dispatch(fetchAllEmployees(filterData));
    };

    const handleSubmit = (values, {setSubmitting}) => {
        dispatch(fetchAllEmployees(values));
        setSubmitting(false); 
    }

    const options = [
        { value: '1', label: 'Haridwar' },
        { value: '2', label: 'Roorkee' },
    ];

    const clearData = (resetForm) => {
        const filterData = {
            total:0,
            limit:10,
            page:1,
            allocatedLocationId:0,
            employeeName:'',
        };
        dispatch(fetchAllEmployees(filterData));
        resetForm();
    }


    return (
        <div className="">
        <div className='bg-[#373737] rounded-md px-2 py-3'>
            <h2 className='text-white font-bold'>Today's Data</h2>
        </div>
        <div >
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
                                            id="employeeName"
                                            name="employeeName"
                                            type="text"
                                            label="Employee Name"
                                            as={InputBox}
                                        />
                                    </div>
                                    <div className='mr-10'>
                                        <Field
                                            id="allocatedLocationId"
                                            name="allocatedLocationId"
                                            label="Select Location"
                                            component={SelectBox}
                                            options={options}
                                            placeholder="Select an option"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className='mr-10'>
                                        <Button
                                            type='submit'
                                            disabled={isSubmitting}
                                            className='bg-blue-600 text-white focus:ring-0 focus:outline-none w-auto py-1 mr-4 font-semibold'
                                        >
                                            {isSubmitting ? 'Searching...' : 'Search'}
                                        </Button>
                                        <Button
                                            type='button'
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
                status === 'succeeded' && employees.length === 0 && 
                <div className='border my-2 px-2 py-2 rounded text-sm font-bold text-white bg-red-600'>No Employees Found</div>
            }
            {status === 'succeeded' && employees.length > 0 && (
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
                                <th className="py-2 border text-sm px-5 text-left">Location</th>
                                <th className="py-2 border text-sm px-5 text-left">New Loans</th>
                                <th className="py-2 border text-sm px-5 text-left">New Loans Amount</th>
                                <th className="py-2 border text-sm px-5 text-left">Balance</th>
                                <th className="py-2 border text-sm px-5 text-right">Amount Collected</th>
                            </tr>
                        </thead>
                        <tbody className='overflow-y-scroll'>
                            {employees.map((employee, index) => (
                                <tr className='border-b' key={index} >
                                    <td className="py-1 border text-sm px-5">{((page - 1) * limit) + (index+1)}</td>
                                    <td className="py-1 border text-sm px-5 hover:cursor-pointer" onClick={() => showEmpDetails(employee)}>{employee.name}</td>
                                    <td className="py-1 border text-sm px-5">{employee.mobile}</td>
                                    <td className="py-1 border text-sm px-5">{employee.allocatedLocationId}</td>
                                    <td className="py-1 border text-sm px-5">{employee.aadhaarNo}</td>
                                    <td className="py-1 border text-sm px-5">{employee.panNo}</td>
                                    <td className="py-1 border text-sm px-5 text-right">00</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </div>
    //     <div className="">
    //     <div className='bg-[#373737] rounded-md px-2 py-4'>
    //         <h2 className='text-white font-bold'>Today's Data</h2>
    //     </div>
    //     <div className=''>
    //     <div className="flex gap-9 my-8">
    //         <select onChange={(e)=>fetchWorkersByLocation(e.target.value)} name="Location" id="">
    //         <option value="Haridwar">Haridwar</option>
    //         <option value="Roorkee">Roorkee</option>
    //         <option value="Bhagwanpur">Haridwar</option>
    //         <option value="Haridwar">Haridwar</option>
    //         </select>
        

    //     </div>
    //     <table className='w-full'>
    //         <thead>
    //         <tr>
    //             <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Id</th>
    //             <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Name</th>
    //             <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Location</th>
    //             <th className="border-b border-blue-gray-50 py-7 px-5 text-left">New Loans</th>
    //             <th className="border-b border-blue-gray-50 py-7 px-5 text-left">New Loans Amount</th>
    //             <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Collection</th>
    //             <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Balance</th>
    //         </tr>
    //         </thead>
    //         <tbody>
    //         {loans.map((loan)=>(
    //             <tr key={loan.id}>
    //             <td className="py-5 px-5 border-b border-blue-gray-50">{loan.id}</td>
    //             <td className="py-5 px-5 border-b border-blue-gray-50">{loan.name}</td>
    //             <td className="py-5 px-5 border-b border-blue-gray-50">{loan.mobnumber}</td>
    //             <td className="py-5 px-5 border-b border-blue-gray-50">{loan.location}</td>
    //             <td className="py-5 px-5 border-b border-blue-gray-50">{loan.totalloans}</td>
    //             <td className="py-5 px-5 border-b border-blue-gray-50">{loan.totalamt}</td>
    //             <td className="py-5 px-5 border-b border-blue-gray-50">{loan.totalamt}</td>
    //         </tr>
    //         ))
    //         } 
    //         </tbody>
    //     </table>
    //     </div>
    // </div>
    )
}

export default Todaysdata
