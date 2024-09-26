import React, { memo } from 'react';
import Modal from './Modal';

const CustomerDetailsModal = ({ customer, isOpen, onChange }) => {

    console.log("Customer Details rendered");

    return (
        <Modal
            isOpen={isOpen}
            onChange={onChange}
            title="Customer Detail"
            modalWidth="60%"
            minHeight="350px"
            top="45%"
            height="auto"
        >
            <div className="">
                <div className="flex flex-col m-6">
                    <div className='flex justify-between'>
                        
                        <div className='flex-1'>
                            <div className="m-auto w-40 h-40">
                                <img 
                                    className="w-full h-full rounded-full object-cover" 
                                    src={customer?.profilePic || "https://default-image-url.com"} 
                                    alt={customer?.firstName || "Customer"} 
                                />
                            </div>
                            <div className='py-6 text-center'>
                                <div className='text-xl'>
                                    {customer?.firstName} {customer?.lastName || ""}
                                </div>
                            </div>
                        </div>

                        
                        <div className='flex-1'>
                            <div className='text-xl mb-1 font-bold'>Details: </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-[16px] mb-1">First Name: 
                                    <span className='text-gray-500 text-[15px]'>{customer?.firstName || "N/A"}</span>
                                </p>
                                <p className="text-[16px] mb-1">Last Name: 
                                    <span className='text-gray-500 text-[15px]'>{customer?.lastName || "N/A"}</span>
                                </p>
                                <p className="text-[16px] mb-1">Mobile No: 
                                    <span className='text-gray-500 text-[15px]'>{customer?.mobileNumber || "N/A"}</span>
                                </p>
                                <p className="text-[16px] mb-1">Aadhaar No: 
                                    <span className='text-gray-500 text-[15px]'>{customer?.aadhaarNumber || "N/A"}</span>
                                </p>
                                <p className="text-[16px] mb-1">Pan No: 
                                    <span className='text-gray-500 text-[15px]'>{customer?.panNumber || "N/A"}</span>
                                </p>
                                <p className="text-[16px] mb-1">Permanent Address: 
                                    <span className='text-gray-500 text-[15px]'>{customer?.permanentAddress || "N/A"}</span>
                                </p>
                                <p className="text-[16px] mb-1">Occupation: 
                                    <span className='text-gray-500 text-[15px]'>{customer?.occupation || "N/A"}</span>
                                </p>
                                <p className="text-[16px] mb-1 flex flex-col">Loan Details: 
                                    {customer?.loanDetails.map((item)=>{
                                        return(
                                            <span className='text-gray-500 text-[15px]'> Id: {item.id}  || Amount: {item.loanAmount }  || LoanStatus: {item.status } || AmountPending: {item.loanAmount-item.amountPaid}</span>
                                        )
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default memo(CustomerDetailsModal);
