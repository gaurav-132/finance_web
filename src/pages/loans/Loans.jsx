import React, { useEffect, useState } from 'react'
import { fetchAllLoans } from '../../app/slices/loansSlice';
import { useDispatch, useSelector } from 'react-redux';

function Loans() {

   const dispatch = useDispatch();
   const loans = useSelector((state)=>state.loans.loans);
   const status =useSelector((state)=>state.loans.status);
   const error = useSelector((state)=>state.loans.error);

   const [filteredLoans, setFilteredLoans] = useState([]);

   useEffect(() => {
    dispatch(fetchAllLoans());
  }, [dispatch]);

  useEffect(() => {
    // Update the filtered loans whenever the full loan list changes
    setFilteredLoans(loans);
  }, [loans]);


    // const [loans,setloans]=useState([ { id: 1, name: 'John Doe', mobnumber: '1234567890', location: 'Haridwar', agent: 'Raghav', amount: 10000, pendingAmount: 2000 },
    //     { id: 2, name: 'Jane Doe', mobnumber: '0987654321', location: 'Roorkee', agent: 'Raju', amount: 15000, pendingAmount: 5000 },
    //     { id: 3, name: 'Bob Smith', mobnumber: '1234509876', location: 'Bhagwanpur', agent: 'Kamlesh', amount: 12000, pendingAmount: 3000 },
    //  ]);

  //  const [workers,setWorkers] = useState(["raju","kaju","kamlesh"])
  //  console.log(loans);
      

   const fetchLoansByLocation = (location) => {
    const filtered = loans.filter((loan) => loan.location === location);
    setFilteredLoans(filtered);
  };

  const fetchLoansByAgent = (agentname) => {
    const filtered = loans.filter((loan) => loan.agent === agentname);
    setFilteredLoans(filtered);
  };

  const fetchActiveLoans = () => {
    const filtered = loans.filter((loan) => loan.status === 'Active');
    setFilteredLoans(filtered);
  };

  const fetchCompletedLoans = () => {
    const filtered = loans.filter((loan) => loan.status === 'Completed');
    setFilteredLoans(filtered);
  };
  
  if(status==="loading"){
    return <div>Loading....</div>
  }

  if(status==="failed"){
    return <div>Error:{error}</div>
  }

  return (
    <div className="">
    <div className='bg-[#373737] rounded-md px-2 py-4'>
        <h2 className='text-white font-bold'>Loans</h2>
    </div>
    
    <div className=''>
      <div className="flex gap-9 my-8">
        <button className="bg-[#373737] text-white  py-2 px-5 rounded-md" onClick={()=>dispatch(fetchAllLoans())}>ALL</button>
        <button className="bg-[#373737] text-white  py-2 px-5 rounded-md" onClick={fetchActiveLoans}>ACTIVE</button>
        <button className="bg-[#373737] text-white  py-2 px-5 rounded-md" onClick={fetchCompletedLoans}>COMPLETED</button>
        <select onChange={(e)=>fetchLoansByLocation(e.target.value)} name="Location" id="">
          <option value="Haridwar">Haridwar</option>
          <option value="Roorkee">Roorkee</option>
          <option value="Bhagwanpur">Bhagwanpur</option>
          <option value="Haridwar">Haridwar</option>
        </select>
        <select name="Worker" onChange={(e)=>fetchLoansByAgent(e.target.value)}  id="">
          <option value=""> Select Agent</option>
          {/* {workers.map((worker,i)=>{
            <option key={i} value={worker}>
              {worker}
            </option>
          })} */}
        </select>

      </div>
      <table className='w-full'>
        <thead>
          <tr>
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Id</th>
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Name</th>
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Contact NO</th>
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Location</th>
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Agent</th>
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Total amt</th>
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Pending amt</th>
          </tr>
        </thead>
        <tbody>
          {filteredLoans.map((loan)=>(
            <tr key={loan.id}>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.id}</td>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.name}</td>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.mobnumber}</td>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.location}</td>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.agent}</td>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.amount}</td>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.pendingAmount}</td>
          </tr>
          ))
          } 
        </tbody>
      </table>
    </div>
</div>
  )
}

export default Loans
