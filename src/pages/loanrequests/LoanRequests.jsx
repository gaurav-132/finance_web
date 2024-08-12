import React from 'react'
import LoanRequestsCard from '../../components/LoanRequestsCard'

function LoanRequests() {
    return (
    <div className="h-full">
        <div className='bg-[#373737] rounded-md px-2 py-4'>
            <h2 className='text-white font-bold'>Loan Request's</h2>
        </div>

        <div className="h-[95%] ">
            <LoanRequestsCard/>
            <LoanRequestsCard/>
            <LoanRequestsCard/>
            <LoanRequestsCard/>
        </div>
    </div>
    )
}

export default LoanRequests
