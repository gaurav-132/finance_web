import React, { useEffect } from 'react';
import {fetchEmployeeDetails} from "../app/slices/employeeDetailSlice"
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import Heatmap from './Heatmap';

const EmployeeDetailsModal = ({
     employeeId, 
     isOpen, 
     onChange }) => {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employeedetail.employee);
  const status = useSelector((state) => state.employeedetail.status);
  const error = useSelector((state) => state.employeedetail.error);

  useEffect(() => {
    if (employeeId && isOpen) {
      dispatch(fetchEmployeeDetails(employeeId));
    }
  }, [dispatch, employeeId, isOpen]);



  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      title="Employee Detail"
      modalWidth="1200px"
      minHeigth="350px"
      top="52%"
      height="auto"
    >
      {status === 'loading' ? (
        <div>Loading...</div>
      ) : status === 'failed' ? (
        <div>Error: {error}</div>
      ) : (
        <div className="">
          <div className="flex flex-col m-6">
            <div className='flex'>
              <div className="w-1/4">
                <img className="w-full" src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
              </div>
              <div className="flex flex-col justify-center px-7">
                <p className="text-xl">ID: {employee.id}</p>
                <p className="text-xl">Name: {employee.name}</p>
                <p className="text-xl">Mobile No: {employee.mobileNo}</p>
                <p className="text-xl">Location: {employee.location}</p>
                <p className="text-xl">Full Address: {employee.fullAddress}</p>
              </div>
            </div>
            <div className='flex gap-8 my-4'>
              <div className="flex flex-col p-7 bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm justify-between">
                <p className="text-xl">Total Loan Amount:</p>
                <p className="text-2xl">{employee.totalAmount}</p>
              </div>
              <div className="flex flex-col p-7 bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm justify-between">
                <p className="text-xl">Total Loans:</p>
                <p className="text-2xl">{employee.totalLoans}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="w-2/4 m-3">
              <h2>Collection:</h2>
              <Heatmap />
            </div>
            <div className="w-2/4 m-3">
              <h2>Salary:</h2>
              <Heatmap />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EmployeeDetailsModal;
