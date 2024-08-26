import React, { useEffect } from 'react';
import Modal from './Modal';
import Heatmap from './Heatmap';

const EmployeeDetailsModal = ({
        employee, 
        isOpen, 
        onChange 
    }) => {

    return (
        <Modal
            isOpen={isOpen}
            onChange={onChange}
            title="Employee Detail"
            modalWidth="60%"
            minHeigth="350px"
            top="45%"
            height="auto"
        >
            <div className="">
                <div className="flex flex-col m-6">
                    <div className='flex justify-between'>
                        <div className='flex-1'>
                            <div className="m-auto w-40 h-40">
                                <img className="w-full h-full rounded-full object-cover" src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
                            </div>
                            <div className='py-6 text-center'>
                                <div className='text-xl'>{employee.name}</div>
                            </div>
                        </div>
                        <div className='flex-1'>
                            <div className='text-xl mb-1 font-bold'>Details: </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-[16px] mb-1">Name: <span className='text-gray-500 text-[15px]'>{employee.name}</span></p>
                                <p className="text-[16px] mb-1">Mobile No: <span className='text-gray-500 text-[15px]'>{employee.mobile}</span></p>
                                <p className="text-[16px] mb-1">Aadhaar No: <span className='text-gray-500 text-[15px]'>{employee.aadhaarNo}</span></p>
                                <p className="text-[16px] mb-1">Pan No: <span className='text-gray-500 text-[15px]'>{employee.panNo}</span></p>
                            </div>
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
        </Modal>
    );
};

export default EmployeeDetailsModal;
