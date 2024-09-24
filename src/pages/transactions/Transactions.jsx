import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form, Formik } from 'formik';
import InputBox from '../../components/InputBox';
import SelectBox from '../../components/SelectBox';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../app/slices/transactionSlice';
import { fetchAllLocations } from '../../app/slices/locationSlice';

function Transactions() {
    const dispatch = useDispatch();

    const { transactions, total, limit, page, status, error } = useSelector((state) => state.transactions);
    const { locations } = useSelector(state => state.locations);

    const [showFilter, setShowFilter] = useState(false);
    const filterData = {
        total,
        limit,
        page,
        allocatedLocationId: 0,
        employeeName: '',
        date: '', 
    };

    useEffect(() => {
        dispatch(fetchTransactions(filterData));
        dispatch(fetchAllLocations());
    }, [dispatch]);

    const handlePageChange = (newPage) => {
        filterData.page = newPage;
        dispatch(fetchTransactions(filterData));
    };

    const handleSubmit = (values, { setSubmitting }) => {
        dispatch(fetchTransactions(values));
        setSubmitting(false);
    };

    const options = locations.map((item) => ({
        value: item.id,
        label: item.locationName,
    }));

    const clearData = (resetForm) => {
        const filterData = {
            total: 0,
            limit: 10,
            page: 1,
            allocatedLocationId: 0,
            employeeName: '',
            date: '', 
        };
        dispatch(fetchTransactions(filterData));
        resetForm();
    };

    return (
        <div className="">
            <div className='bg-[#373737] rounded-md px-2 py-3'>
                <h2 className='text-white font-bold'>Transactions</h2>
            </div>
            <div>
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
                                        <div className='mr-10'>
                                            <Field
                                                id="date"
                                                name="date"
                                                label="Select Date"
                                                type="date"
                                                as={InputBox} 
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
                    status === 'loading' &&
                    <div className='border px-2 py-2 rounded text-sm font-bold text-white bg-yellow-400'>Loading...</div>
                }
                {
                    (status === 'succeeded' && (!transactions || transactions.length === 0)) &&
                    <div className='border my-2 px-2 py-2 rounded text-sm font-bold text-white bg-red-600'>No Data Found</div>
                }
                {status === 'succeeded' && transactions && transactions.length > 0 && (
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
                                    <th className="py-2 border text-sm px-5 text-left">Location</th>
                                    <th className="py-2 border text-sm px-5 text-right">Amount</th>
                                    <th className="py-2 border text-sm px-5 text-right">Date</th>
                                    <th className="py-2 border text-sm px-5 text-right">Mode</th>
                                </tr>
                            </thead>
                            <tbody className='overflow-y-scroll'>
                                {transactions.map((transaction, index) => (
                                    <tr className='border-b' key={index}>
                                        <td className="py-1 border text-sm px-5">{((page - 1) * limit) + (index + 1)}</td>
                                        <td className="py-1 border text-sm px-5">{transaction.name}</td>
                                        <td className="py-1 border text-sm px-5">{transaction.location}</td>
                                        <td className="py-1 border text-sm px-5 text-right">{transaction.amount}</td>
                                        <td className="py-1 border text-sm px-5 text-right">{transaction.date}</td>
                                        <td className="py-1 border text-sm px-5 text-right">{transaction.mode}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {
                    status === 'failed' &&
                    <div className='border px-2 py-2 rounded text-sm font-bold text-white bg-red-400'>
                        Error loading data: {error}
                    </div>
                }
            </div>
        </div>
    );
}

export default Transactions;
