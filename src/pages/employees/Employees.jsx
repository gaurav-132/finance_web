import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployees } from '../../app/slices/employeeSlice';


const Employees = () => {

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const status = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);
  
  const [filteredEmployees , setFilteredEmployees] = useState([])

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  useEffect(()=>{
    setFilteredEmployees(employees)
  },[employees])


  const fetchWorkersByLocation = (location) =>{
    const filtered = employees.filter((employee)=>employee.location === location)
    setFilteredEmployees(filtered)
   }
   const fetchWorkersByName = (name) =>{
    const filtered = employees.filter((employee)=>employee.name === name)
    setFilteredEmployees(filtered)
   }
  

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  
    return (
        <div className="">
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Employees</h2>
            </div>
            <div className=''>
      <div className="flex gap-9 my-8">
        <select onChange={(e)=>fetchWorkersByLocation(e.target.value)} name="Location" id="">
          <option value="Haridwar">Haridwar</option>
          <option value="Roorkee">Roorkee</option>
          <option value="Bhagwanpur">Haridwar</option>
          <option value="Haridwar">Haridwar</option>
        </select>
        <select name="Worker" onChange={(e)=>fetchWorkersByName(e.target.value)}  id="">
          <option value=""> Select Worker</option>
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
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Contact No</th>
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Location</th>
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Total Loans</th>
            <th className="border-b border-blue-gray-50 py-7 px-5 text-left">Total amt</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((loan)=>(
            <tr key={loan.id}>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.id}</td>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.name}</td>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.mobnumber}</td>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.location}</td>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.totalLoans}</td>
            <td className="py-5 px-5 border-b border-blue-gray-50">{loan.totalAmt}</td>
          </tr>
          ))
          } 
        </tbody>
      </table>
    </div>
        </div>
    )
}

export default Employees