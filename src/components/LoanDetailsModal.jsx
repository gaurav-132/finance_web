import React from 'react'
import Modal from './Modal'

function LoanDetailsModal({loan,isOpen,onChange}) {
  return (
    <Modal
    isOpen={isOpen}
    onChange={onChange}
    title="Loan Detail"
    modalWidth="60%"
    minHeight="350px"
    top="45%"
    height="auto"
    >
    <div className=''>
        <div className="flex flex-col m-6">
            <div className="flex justify-between">
                <div className="flex-1">
                    <div className="m-auto w-40 h-40">
                    <img 
                                    className="w-full h-full rounded-full object-cover" 
                                    src={loan?.profilePic || "https://default-image-url.com"} 
                                    alt={loan?.firstName || "Customer"} 
                                />
                    </div>
                    <div className="py-6 text-center">
                        <div className="text-xl">
                            {loan?.firstName  || ""}
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="text-xl mb-1 font-bold">Details:</div>
                    <div className="flex flex-col justify-center">
                        <p className="text-[16px] mb-1">Name:
                            <span className="text-gray-500 text-[15px]">{loan?.firstName || "N/A"}</span>
                        </p>
                        <p className="text-[16px] mb-1">Mobile No:
                            <span className="text-gray-500 text-[15px]">{loan?.mobileNumber || "N/A"}</span>
                        </p>
                        <p className="text-[16px] mb-1">Loan Amount:
                            <span className="text-gray-500 text-[15px]">{loan?.loanAmount || "N/A"}</span>
                        </p>
                        <p className="text-[16px] mb-1">Total Amount:
                            <span className="text-gray-500 text-[15px]">{loan?.totalAmount || "N/A"}</span>
                        </p>
                        <p className="text-[16px] mb-1">Collected Amount:
                            <span className="text-gray-500 text-[15px]">{loan?.amountPaid || "N/A"}</span>
                        </p>
                        <p className="text-[16px] mb-1">Pending Amount:
                            <span className="text-gray-500 text-[15px]">{loan?.totalAmount-loan?.amountPaid || "N/A"}</span>
                        </p>
                        <p className="text-[16px] mb-1">Profit:
                            <span className="text-gray-500 text-[15px]">{loan?.totalAmount-loan?.loanAmount || "N/A"}</span>
                        </p>
                        <p className="text-[16px] mb-1">Issue date:
                            <span className="text-gray-500 text-[15px]">{loan?.startDate || "N/A"}</span>
                        </p>
                        <p className="text-[16px] mb-1">Due Date:
                            <span className="text-gray-500 text-[15px]">{loan?.endDate || "N/A"}</span>
                        </p>
                        <p className="text-[16px] mb-1">Logs: </p>

                        {loan?.transactionLogs.map((item)=>{
                            return(
                                <div className="flex flex-col">
                                <span className="text-gray-500 text-[15px]">{item.date} || {item.amount}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </Modal>
  )
}

export default LoanDetailsModal
