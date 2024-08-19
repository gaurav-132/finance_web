import React from 'react'
import Modal from './Modal'
import Button from './Button'

const LoanActionModal = ({
    isOpen,
    loanRequest,
    modalWidth,
    height,
    onChange,
    handleDispatchAction,
}) => {
    console.log(loanRequest.firstName)
    return (
        <Modal
            isOpen={isOpen}
            modalWidth={modalWidth}
            height={height}
            onChange={onChange}
            top="40%"
            title="Loan Request Details"
        >
            <div className="">
                <div className="flex flex-col m-6">
                    <div className='flex justify-between'>
                        <div className='flex-1'>
                            <div className="m-auto w-40 h-40">
                                <img className="w-full h-full rounded-full object-cover" src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
                            </div>
                            <div className='py-6 text-center'>
                                <div className='text-xl'>{loanRequest.firstName + loanRequest.lastName}</div>
                                <div className='text-sm'>Occupation: <span className='text-gray-500 text-[15px]'>{loanRequest.occupation}</span></div>
                                <div className='text-sm'>Work Location: <span className='text-gray-500 text-[15px]'>{loanRequest.workLocation}</span></div>
                            </div>
                        </div>
                        <div className='flex-1'>
                            <div className='text-xl mb-1 font-bold'>Details: </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-[15px] mb-1">Requested through: <span className='text-gray-500 text-[15px]'>{loanRequest.requestedThroughName}</span></p>
                                <p className="text-[15px] mb-1">Requested Amount: <span className='text-gray-500 text-[15px]'>{loanRequest.loanAmount}</span></p>
                                <p className="text-[15px] mb-1">Total Amount : <span className='text-gray-500 text-[15px]'>{loanRequest.totalAmountAfterTax}</span></p>
                                <p className="text-[15px] mb-1">Mobile No: <span className='text-gray-500 text-[15px]'>{loanRequest.mobileNumber}</span></p>
                                <p className="text-[15px] mb-1">Aadhaar No: <span className='text-gray-500 text-[15px]'>{loanRequest.aadhaarNumber}</span></p>
                                <p className="text-[15px] mb-1">Pan No: <span className='text-gray-500 text-[15px]'>{loanRequest.panNumber}</span></p>
                                <p className="text-[15px] mb-1">Permanent Address: <span className='text-gray-500 text-[15px]'>{loanRequest.permanentAddress}</span></p>
                                <p className="text-[15px] mb-1">Current Address: <span className='text-gray-500 text-[15px]'>{loanRequest.currentAddress}</span></p>
                                <p className="text-[15px] mb-1">Check Photo: <a target='_blank' href={`${loanRequest.check}`} className='bg-blue-500 cursor-pointer text-white px-2 py-1 rounded-md mx-4'>View</a></p>
                            </div>
                        </div>

                    </div>
                </div>
                <hr />
                <div className='flex items-center px-4 py-[8px] justify-end'>
                    <Button
                        className='bg-blue-500 py-1'
                        onClick={
                            () => handleDispatchAction({
                                action:1, 
                                id: loanRequest.id, 
                                totalAmount: loanRequest.totalAmountAfterTax,
                                tax: loanRequest.taxRate
                            })
                        }
                    >
                        Approve
                    </Button>
                    <Button
                        className='bg-red-500 ml-8 py-1'
                        onClick={
                            () => handleDispatchAction({
                                action:2, 
                                id: loanRequest.id, 
                                totalAmount: loanRequest.totalAmountAfterTax,
                                tax: loanRequest.taxRate
                            })
                        }
                    >
                        Reject
                    </Button>
                </div>
            </div>
        </Modal>   
    )
}

export default LoanActionModal