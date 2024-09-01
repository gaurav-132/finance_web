import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployees, updateEmployee } from '../../app/slices/employeeSlice';
import Button from '../../components/Button';
import AlertModal from '../../components/AlertModal';
import SelectBox from '../../components/SelectBox';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import InputBox from '../../components/InputBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmployeeDetailsModal from '../../components/EmployeeDetailsModal';
import UpdateEmployeeDetailModal from '../../components/UpdateEmployeeDetailModal';
import Pagination from '../../components/Pagination';
import { fetchAllLocations } from '../../app/slices/locationSlice';

const Employees = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isemployeeDetailsModalOpen,setIsEmployeeDetailsModal] = useState(false);
    const [openAlertModal, setOpenAlertModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    
    const [showFilter, setShowFilter] = useState(false);
    const { employees, total, limit, page, status, error, updateResponse } = useSelector((state) => state.employees);
    const {locations} = useSelector(state=>state.locations);

    const [employee, setEmployee] = useState({});
    const filterData = {
        total,
        limit,
        page,
        allocatedLocationId:0,
        employeeName:'',
    }


    const [initialValues, setInitialValues] = useState({
        empId: '',
        markSheet: '',
        check: '',
        photo: '',
        aadhaarNo: '',
        panNo: '',
        allocatedLocationId: 1,
    });



    useEffect(() => {
        dispatch(fetchAllEmployees(filterData));
        dispatch(fetchAllLocations());
    }, [dispatch]);

    useEffect(() => {
        if (updateResponse) {
            setAlertMessage(updateResponse);
            setOpenAlertModal(true);
        }
    }, [updateResponse]);

    
    const showEmpDetails = (employee) => {
        setEmployee(employee);
        setIsEmployeeDetailsModal(true);
    };
  

    const changeModalStatus = (employee) => {
        setInitialValues({
            empId: employee.id,
            name: employee.name,
            markSheet: employee.markSheet,
            check: employee.check,
            photo: employee.photo,
            aadhaarNo: employee.aadhaarNo || '',
            panNo: employee.panNo || '',
            allocatedLocationId: employee.allocatedLocationId,
        });

        setIsModalOpen(true);
    };

    const handlePageChange = (newPage) => {
        filterData.page = newPage;
        dispatch(fetchAllEmployees(filterData));
    };

    const handleSubmitDetails =  (formData) => {
        dispatch(updateEmployee(formData));
    };
    

    const options = locations.map((item) => ({
        value: item.id,
        label: item.locationName,
      }));

    const handleSubmit = (values, {setSubmitting}) => {
        dispatch(fetchAllEmployees(values));
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
        dispatch(fetchAllEmployees(filterData));
        resetForm();
    }

    return (
        <div className="">
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Employees</h2>
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
                                    <th className="py-2 border text-sm px-5 text-left">Aadhaar No</th>
                                    <th className="py-2 border text-sm px-5 text-left">Pan No</th>
                                    <th className="py-2 border text-sm px-5 text-right">#</th>
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
                    </div>
                )}
            </div>
            <UpdateEmployeeDetailModal
                isOpen={isModalOpen}
                onChange={setIsModalOpen}
                modalWidth="60%"
                height="380px"
                initialValues={initialValues}
                submitDetails={handleSubmitDetails}
            />
            <AlertModal
                isOpen={openAlertModal}
                onChange={setOpenAlertModal}
                message={alertMessage}
            />
            <EmployeeDetailsModal
                isOpen={isemployeeDetailsModalOpen}
                onChange={setIsEmployeeDetailsModal}
                employee={employee}
                modalWidth="60%"
                height="200px"
            />
        </div>
    );
};

export default Employees;
