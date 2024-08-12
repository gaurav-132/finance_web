import React from 'react'

function LoanRequestsCard() {
  return (
   
    <div className=" flex my-6 h-64 bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
        <div className=' h-1/2 w-1/4 m-6'><img className="h-full " src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
        <p className="text-center my-4">Raghav</p></div>
        <div className="w-3/4 my-6 mx-2 flex flex-col">
        <p>Amount:</p>
        <p>Address:</p>
        <p>Mobile no:</p>
        <div className='flex gap-14 my-8'>
        <button className="bg-green-400 py-1 w-2/4">ACCEPT</button>
        <button className='bg-red-500 py-1 w-2/4'>DECLINE</button>
        </div>
        </div>
    </div>
    
   
  )
}

export default LoanRequestsCard
