import React, { useEffect, memo } from 'react';
import Modal from './Modal';
import { faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EmployeeDetailsModal = ({
        employee, 
        isOpen, 
        onChange 
    }) => {
        
    console.log("Employee Details rendered")
    const totalLoans = employee.loanDetails.length;
    const totalLoanAmount = employee.loanDetails.reduce((acc, loan) => acc + loan.loanAmount, 0);

    console.log(totalLoans);
    
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
                                <div className='text-xl'>{employee?.firstName||"NA"}</div>
                            </div>
                            <div className="flex p-4 items-center bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm justify-between">
                            <div className='flex flex-col'>
                                <h1>Salary</h1>
                            </div>
                            </div>
                        </div>
                        <div className='flex-1'>
                            <div className='text-xl mb-1 font-bold'>Details: </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-[16px] mb-1">Name: <span className='text-gray-500 text-[15px]'>{employee?.firstName||"NA"}</span></p>
                                <p className="text-[16px] mb-1">Mobile No: <span className='text-gray-500 text-[15px]'>{employee?.mobile||"NA"}</span></p>
                                <p className="text-[16px] mb-1">Aadhaar No: <span className='text-gray-500 text-[15px]'>{employee?.aadhaarNo||"NA"}</span></p>
                                <p className="text-[16px] mb-1">Pan No: <span className='text-gray-500 text-[15px]'>{employee?.panNo||"NA"}</span></p>
                            </div>
                            <div className="flex p-4 items-center bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm justify-between">
                            <FontAwesomeIcon className="size-9" icon={faMoneyBillTrendUp} />
                            <div className='flex flex-col'>
                                <h1>Total Loan amt.</h1>
                                <p className='text-xl'>Rs.{totalLoanAmount||"NA"}</p>
                            </div>
                            </div><div className="flex p-4 items-center bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm justify-between">
                            <FontAwesomeIcon className="size-9" icon={faMoneyBillTrendUp} />
                            <div className='flex flex-col'>
                                <h1>Total Loans</h1>
                                <p className='text-xl'>Rs.{totalLoans||"NA"}</p>
                            </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default memo(EmployeeDetailsModal);
