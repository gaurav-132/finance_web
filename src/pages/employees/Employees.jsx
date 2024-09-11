import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployees, updateEmployee } from '../../app/slices/employeeSlice';
import { fetchAllLocations } from '../../app/slices/locationSlice';
import Button from '../../components/Button';
import SelectBox from '../../components/SelectBox';
import InputBox from '../../components/InputBox';
import { Formik, Form, Field } from 'formik'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '../../components/Pagination';
import UpdateEmployeeDetailModal from '../../components/UpdateEmployeeDetailModal';
import EmployeeDetailsModal from '../../components/EmployeeDetailsModal';

const Employees = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEmployeeDetailsModalOpen, setIsEmployeeDetailsModalOpen] = useState(false);
    const [showFilter, setShowFilter] = useState(true);

    const { employees, total, limit, page, status, updateResponse } = useSelector((state) => state.employees);
    const { locations } = useSelector(state => state.locations);

    const [employee, setEmployee] = useState({});
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    const initialFilterData = useMemo(() => ({
        total,
        limit,
        page,
        allocatedLocationId: 0,
        employeeName: '',
    }), [total, limit, page]);

    const [filterData, setFilterData] = useState(initialFilterData);

    const [initialValues, setInitialValues] = useState({
        empId: '',
        markSheet: '',
        check: '',
        photo: '',
        aadhaarNo: '',
        panNo: '',
        allocatedLocationId: 1,
    });

    const handleSubmitDetails = useCallback((formData) => {
        dispatch(updateEmployee(formData));
    }, [dispatch]);

    const memoizedModalProps = useMemo(() => ({
        isOpen: isModalOpen,
        onChange: closeModal,
        modalWidth: "60%",
        height: "380px",
        submitDetails: handleSubmitDetails,
    }), [isModalOpen, closeModal, handleSubmitDetails]);

    useEffect(() => {
        dispatch(fetchAllEmployees(filterData));
        dispatch(fetchAllLocations());
    }, [dispatch, filterData]);

    useEffect(() => {
        if (updateResponse) {
            setAlertMessage(updateResponse);
            setOpenAlertModal(true);
        }
    }, [updateResponse]);

    const showEmpDetails = useCallback((employee) => {
        setEmployee(employee);
        setIsEmployeeDetailsModalOpen(true);
    }, []);

    const handleEmployeeDetailModal = useCallback(() => {
        setIsEmployeeDetailsModalOpen(false);
    }, []);

    const changeModalStatus = useCallback((employee) => {
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
    }, []);

    const handlePageChange = useCallback((newPage) => {
        setFilterData(prevData => ({
            ...prevData,
            page: newPage,
        }));
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        setFilterData(values);
        setSubmitting(false);
    }, []);

    const clearData = useCallback((resetForm) => {
        const newFilterData = {
            total: 0,
            limit: 10,
            page: 1,
            allocatedLocationId: 0,
            employeeName: '',
        };
        setFilterData(newFilterData);
        resetForm();
    }, []);

    const options = useMemo(() => locations.map((item) => ({
        value: item.id,
        label: item.locationName,
    })), [locations]);

    return (
        <div>
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Employees</h2>
            </div>
            <div>
                <div className='relative' style={{ paddingBottom: showFilter ? '0px' : '60px' }}>
                    <div className="mt-4" style={{ display: showFilter ? 'flex' : 'none' }}>
                        <Formik
                            initialValues={filterData}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, resetForm }) => (
                                <Form>
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
                                    <div className='flex'>
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
                                            className='bg-red-600 text-white focus:ring-0 focus:outline-none w-auto py-1 font-semibold'
                                        >
                                            Clear
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className='absolute top-0 right-0' style={{ marginTop: showFilter ? '0px' : '16px' }}>
                        <FontAwesomeIcon
                            onClick={() => setShowFilter(!showFilter)}
                            className='text-xl cursor-pointer'
                            icon="fa-solid fa-filter"
                        />
                    </div>
                </div>

                {status === 'pending' && (
                    <div className='border px-2 py-2 rounded text-sm font-bold text-white bg-yellow-400'>
                        Loading...
                    </div>
                )}

                {status === 'succeeded' && employees.length === 0 && (
                    <div className='border my-2 px-2 py-2 rounded text-sm font-bold text-white bg-red-600'>
                        No Employees Found
                    </div>
                )}
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
                            <tbody>
                                {employees.map((employee, index) => (
                                    <tr className='border-b' key={employee.id}>
                                        <td className="py-1 border text-sm px-5">{((page - 1) * limit) + (index + 1)}</td>
                                        <td className="py-1 border text-sm px-5 blue-500 hover:cursor-pointer" onClick={() => showEmpDetails(employee)}>{employee.name}</td>
                                        <td className="py-1 border text-sm px-5">{employee.mobile}</td>
                                        <td className="py-1 border text-sm px-5">{employee.locationName}</td>
                                        <td className="py-1 border text-sm px-5">{employee.aadhaarNo || 'N/A'}</td>
                                        <td className="py-1 border text-sm px-5">{employee.panNo || 'N/A'}</td>
                                        <td className="py-1 border text-sm px-5 text-right">
                                            <Button
                                                className='bg-[#374151] focus:ring-0 focus:outline-none mr-4 py-1 text-white font-semibold'
                                                onClick={() => changeModalStatus(employee)}
                                            >
                                                Update
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {status === 'failed' && (
                    <div className='border my-2 px-2 py-2 rounded text-sm font-bold text-white bg-red-600'>
                        Error occurred while fetching Employees
                    </div>
                )}
            </div>
            <UpdateEmployeeDetailModal
                {...memoizedModalProps}
                initialValues={initialValues}
            />
        
            <EmployeeDetailsModal
                isOpen={isEmployeeDetailsModalOpen}
                onChange={handleEmployeeDetailModal}
                modalWidth="60%"
                height="380px"
                employee={employee}
            />
            
        </div>
    );
};

export default Employees;
