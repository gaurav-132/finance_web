import React, { useEffect, useMemo, useState } from 'react'
import LoanRequestsCard from '../../components/LoanRequestsCard'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Button from '../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pagination from '../../components/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import InputBox from '../../components/InputBox'
import SelectBox from '../../components/SelectBox'
import { dispatchAction, fetchAllLoanRequests, fetchLoanDetails } from '../../app/slices/loansSlice'
import LoanActionModal from '../../components/LoanActionModal'
import { Bounce, toast } from 'react-toastify';
import { fetchAllLocations } from '../../app/slices/locationSlice'
import LoanDetailsModal from '../../components/LoanDetailsModal'


function Loans() {

    const dispatch = useDispatch();
    const [showFilter, setShowFilter] = useState(true);
    const { loanRequests, page, limit, total, status, dispatchActionRes } = useSelector((state) => state.loans);
    const [openLoanReqModal, setOpenLoanReqModal] = useState(false);
    const [openLoanDetailModal, setOpenLoanDetailModal] = useState(false); 
    const {locations} = useSelector(state=>state.locations);

    const filterData = useMemo(() => ({
        page,
        limit,
        total,
        customerName: '',
        locationId: 0,
        loanStatus: 0,
    }), [page, limit, total]);
    

    const [loanRequest, setLoanRequest] = useState({});

    useEffect(() => {
        dispatch(fetchAllLoanRequests(filterData));
        dispatch(fetchAllLocations());
    }, [dispatch])

    useEffect(() => {
        if(dispatchActionRes){
            setOpenLoanReqModal(false);
            dispatch(fetchAllLoanRequests(filterData));
            toast.success(dispatchActionRes, {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
                transition: Bounce
            });
        }
    },[dispatchActionRes]);



    const handleSubmit = (values, {setSubmitting}) => {
        dispatch(fetchAllLoanRequests(values));
        setSubmitting(false)
    }

    const clearData = (resetForm) => {
        const filterData = {
            total:0,
            limit:10,
            page:1,
            customerName:'',
            loanStatus:0
        };
        dispatch(fetchAllLoanRequests(filterData));
        resetForm();
    }

    const handlePageChange = (newPage) => {
        filterData.page = newPage;
        dispatch(fetchAllLoanRequests(filterData));
    }

    const changeModalStatus =(loanReq) => {
        setLoanRequest(loanReq);
        console.log(loanRequest)
        setOpenLoanReqModal(true)
    }

    const changeDetailModalStatus =(loanId) => {
       dispatch(fetchLoanDetails(loanId));
        setOpenLoanDetailModal(true);
    }

    const handleDispatchAction = (action) => {
        dispatch(dispatchAction(action))
        console.log(action);
    }

    const loanDetails = useSelector(state=>state.loans.loanDetails);


    const options = locations.map((item) => ({
        value: item.id,
        label: item.locationName,
      }));
      
    const loanStatus = [
        { value: 0, label: 'Pending' },
        { value: 1, label: 'Active' },
        { value: 2, label: 'Rejected' },
        { value: 3, label: 'Completed' },
    ];

    return (
    <div className="">
        <div className='bg-[#373737] rounded-md px-2 py-3'>
            <h2 className='text-white font-bold'>Loans</h2>
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
                                            id="loanStatus"
                                            name="loanStatus"
                                            label="Select Loan Status"
                                            component={SelectBox}
                                            options={loanStatus}
                                            placeholder="Select an option"
                                        />
                                    </div>
                                    <div className='mr-10'>
                                        <Field
                                            id="customerName"
                                            name="customerName"
                                            type="text"
                                            label="Customer Name"
                                            as={InputBox}
                                        />
                                    </div>
                                    <div className='mr-10'>
                                        <Field
                                            id="locationId"
                                            name="locationId"
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
                status === 'succeeded' && loanRequests.length === 0 && 
                <div className='border my-2 px-2 py-2 rounded text-sm font-bold text-white bg-red-600'>No Loans Found</div>
            }
            {status === 'succeeded' && loanRequests.length > 0 && (
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
                                <th className="py-2 border text-sm px-5 text-left">Customer Name</th>
                                <th className="py-2 border text-sm px-5 text-left">Aadhaar No</th>
                                <th className="py-2 border text-sm px-5 text-left">Pan No</th>
                                <th className="py-2 border text-sm px-5 text-left">Location</th>
                                <th className="py-2 border text-sm px-5 text-left">Requested Amount</th>
                                <th className="py-2 border text-sm px-5 text-right">#</th>
                            </tr>
                        </thead>
                        <tbody className='overflow-y-scroll'>
                            {loanRequests.map((loan, index) => (
                                <tr className='border-b' key={index} >
                                    <td className="py-1 border text-sm px-5">{((page - 1) * limit) + (index+1)}</td>
                                    <td className="py-1 border text-sm px-5">{loan.firstName + loan.lastName}</td>
                                    <td className="py-1 border text-sm px-5">{loan.aadhaarNumber}</td>
                                    <td className="py-1 border text-sm px-5">{loan.panNumber}</td>
                                    <td className="py-1 border text-sm px-5">{loan.workLocation}</td>
                                    <td className="py-1 border text-sm px-5">{loan.loanAmount}</td>
                                    <td className="py-1 border text-sm px-5 text-right">
                                        {
                                            loan.status === 0 && 
                                            <Button
                                                type='submit'
                                                disabled={false}
                                                onClick={() => changeModalStatus(loan)}
                                                className='bg-blue-500 py-1 text-white focus:ring-0 focus:outline-none w-full font-semibold'
                                            >
                                                Action
                                            </Button>
                                        }
                                        {
                                            loan.status === 1 && 
                                            <Button
                                                type='submit'
                                                disabled={false}
                                                onClick={() => changeDetailModalStatus(loan.id)}
                                                className='bg-blue-500 py-1 text-white focus:ring-0 focus:outline-none w-full font-semibold'
                                            >
                                                View
                                            </Button>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
        <LoanActionModal
            isOpen={openLoanReqModal}
            onChange={setOpenLoanReqModal}
            loanRequest={loanRequest}
            modalWidth="60%"
            height="420px"
            handleDispatchAction={handleDispatchAction}
        />
        <LoanDetailsModal
         isOpen={openLoanDetailModal}
         onChange={setOpenLoanDetailModal}
         modalWidth="60%"
         height="200px"
         loan={loanDetails}
        />
</div>
    )
}

export default Loans
