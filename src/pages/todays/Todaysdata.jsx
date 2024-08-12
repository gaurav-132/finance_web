import React, { useState } from 'react'

function Todaysdata() {
    const fetchWorkersByLocation = (location) =>{
        console.log(location);
        
       }
       const [loans,setloans]=useState([ { id: 1, name: 'John Doe', mobnumber: '1234567890', location: 'Haridwar', agent: 'Raghav', amount: 10000, pendingAmount: 2000 },
        { id: 2, name: 'Jane Doe', mobnumber: '0987654321', location: 'Roorkee', agent: 'Raju', amount: 15000, pendingAmount: 5000 },
        { id: 3, name: 'Bob Smith', mobnumber: '1234509876', location: 'Bhagwanpur', agent: 'Kamlesh', amount: 12000, pendingAmount: 3000 },
     ]);
   const [workers,setWorkers] = useState(["raju","kaju","kamlesh"])



  return (
    <div className="">
    <div className='bg-[#373737] rounded-md px-2 py-4'>
        <h2 className='text-white font-bold'>Today's Data</h2>
    </div>
    <div className=''>
      <div className="flex gap-9 my-8">
        <select onChange={(e)=>fetchWorkersByLocation(e.target.value)} name="Location" id="">
          <option value="Haridwar">Haridwar</option>
          <option value="Roorkee">Roorkee</option>
          <option value="Bhagwanpur">Haridwar</option>
          <option value="Haridwar">Haridwar</option>
        </select>
      

      </div>
      <table className='w-full'>
        <thead>
          <tr>
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Id</th>
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Name</th>
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Location</th>
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">New Loans</th>
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">New Loans Amount</th>
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Collection</th>
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Balance</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan)=>(
            <tr key={loan.id}>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.id}</td>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.name}</td>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.mobnumber}</td>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.location}</td>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.totalloans}</td>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.totalamt}</td>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.totalamt}</td>
          </tr>
          ))
          } 
        </tbody>
      </table>
    </div>
</div>
  )
}

export default Todaysdata
