import React, { useEffect,useState } from 'react'
import Button from '../../components/Button'
import { fetchAllUsers } from '../../app/slices/userSlice'
import { useSelector,useDispatch } from 'react-redux'
import { Formik,Form,Field,ErrorMessage } from 'formik'
import InputBox from '../../components/InputBox'
import SelectBox from '../../components/SelectBox'
import RegisterModal from '../../components/RegisterModal'
import AlertModal from '../../components/AlertModal'
import EmployeeDetailModal from '../../components/EmployeeDetailModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Users() {

    const dispatch = useDispatch();
    const [isModalOpen , setIsModalOpen] = useState(false);
    const [openAlertModal, setOpenAlertModal] = useState(false);
    const [openRegisterModal,setRegisterModal] = useState(false)
    const [alertMessage, setAlertMessage] = useState('');
    const [showFilter, setShowFilter] = useState(false);

    const {users ,total,limit,page ,status,error,updateResponse} = useSelector((state) => state.users)
    const [filterData, setFilterData] = useState({
        total:0,
        limit:10,
        page:1,
        name:'',
    });
    
    const [initialValues, setInitialValues] = useState({
        userId: "",
        name: "",
        mobile:"",
        isActive:""
    });

    useEffect(() => {
        dispatch(fetchAllUsers(filterData));
    }, [dispatch]);

    useEffect(() => {
        if (updateResponse) {
            setAlertMessage(updateResponse);
            setOpenAlertModal(true);
            dispatch(fetchAllUsers());
        }
    }, [updateResponse, dispatch]);


    const changeRegiterModalStatus = () => {
        setRegisterModal(true);
    } 
   
    const handlePageChange = (newPage) => {
        filterData.page = newPage;
        dispatch(fetchAllUsers(filterData));
    };


    const handleSubmit = (values, { setSubmitting }) => {
        dispatch(fetchAllUsers(values));
        setSubmitting(false)
    };

    const clearData = (resetForm) => {
        const filterData = {
            total:0,
            limit:10,
            page:1,
            allocatedLocationId:0,
            employeeName:'',
        };
        dispatch(fetchAllUsers(filterData));
        resetForm();
    }

    return (
    <div className="h-full">
        <div className='bg-[#373737] rounded-md px-2 py-3 flex justify-between items-center'>
            <h2 className='text-white font-bold'>Users</h2>
            <Button
                className='bg-blue-600 text-white focus:ring-0 focus:outline-none py-1 px-4 font-semibold'
                onClick={() => {changeRegiterModalStatus()} 
                }
            >
                Add User
            </Button>
        </div>

        <div className='py-2'>
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
                status === 'succeeded' && users.length === 0 && 
                <div className='border px-2 mt-2 py-2 rounded text-sm font-bold text-white bg-red-600'>No Users Found</div>
            }
            {status === 'succeeded' && users.length > 0 && (
                <div>
                    <div className="pagination flex justify-between my-2 items-center">
                        <div>
                            <p className='text-sm'>Total Users: {total}</p>
                        </div>
                        <div className='text-right'>
                            <Button
                                disabled={page === 1}
                                className='text-sm bg-red-700 py-1'
                                onClick={() => handlePageChange(page - 1)}>
                                Previous
                            </Button>
                            <span className='text-sm mx-4'>Page {page} of {Math.ceil(total / limit)}</span>
                            <Button
                                className='text-sm bg-red-700 py-1'
                                disabled={page * limit >= total}
                                onClick={() => handlePageChange(page + 1)}>
                                Next
                            </Button>
                        </div>
                    </div>
                    <table className='w-full border'>
                        <thead>
                            <tr className='border-b'>
                                <th className="py-2 border text-sm px-5 text-left">Id</th>
                                <th className="py-2 border text-sm px-5 text-left">Name</th>
                                <th className="py-2 border text-sm px-5 text-left">Contact No</th>
                                <th className="py-2 border text-sm px-5 text-left">IsActive</th>
                                <th className="py-2 border text-sm px-5 text-right">#</th>
                            </tr>
                        </thead>
                        <tbody className='overflow-y-scroll'>
                            {users.slice(0,10).map((user, index) => (
                                <tr className={`border-b ${user.isAdmin?"bg-green-500":""}`} key={index}>
                                    <td className="py-2 border text-sm px-5">{index+1}</td>
                                    <td className="py-2 border text-sm px-5">{user.firstName} {user.lastName}</td>
                                    <td className="py-2 border text-sm px-5">{user.mobile}</td>
                                    <td className="py-2 border text-sm px-5">{user.isActive}</td>                                 
                                    <td className="py-2 border text-sm px-5 text-right">
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
            
        <RegisterModal
            isOpen={openRegisterModal}
            onChange={setRegisterModal}
            modalWidth="60%"
            height="350px"
            filterData={filterData}
        />
    </div>
  )
}

export default Users;
