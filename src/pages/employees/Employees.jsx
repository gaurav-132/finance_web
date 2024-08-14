import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployees } from '../../app/slices/employeeSlice';
import Button from '../../components/Button';
import EmployeeDetailModal from '../../components/EmployeeDetailModal';



const Employees = () => {

    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [initialValues, setInitialValues] = useState({
        empId: '',
        markSheet: '',
        check: '',
        photo: '',
        aadhaarNo: '',
        panNo: '',
        allocatedLocationId: 1,
    });

    const employees = useSelector((state) => state.employees.employees);

    const [filteredEmployees , setFilteredEmployees] = useState([])

    useEffect(() => {
        dispatch(fetchAllEmployees());
    },[]);


    const fetchWorkersByLocation = (location) =>{
        const filtered = employees.filter((employee)=>employee.location === location)
        setFilteredEmployees(filtered)
    }
    const fetchWorkersByName = (name) =>{
        const filtered = employees.filter((employee)=>employee.name === name)
        setFilteredEmployees(filtered)
    }
    
    const changeModalStatus = (employee) => {
        setInitialValues({
            empId: employee.id,
            name: employee.name,
            markSheet: '', 
            check: '', 
            photo: '', 
            aadhaarNo: employee.aadhaarNo || '',
            panNo: employee.panNo || '',
            allocatedLocationId: employee.locationId || 1,
        });
        console.log(initialValues)

        setIsModalOpen(true);
    }

    const handleSubmitDetails = (values) => {
        dispatch(updateEmployee(values));
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
                <table className='w-full border'>
                    <thead>
                        <tr className='border-b'>
                            <th className="py-2 border text-sm px-5 text-left">Id</th>
                            <th className="py-2 border text-sm px-5 text-left">Name</th>
                            <th className="py-2 border text-sm px-5 text-left">Contact No</th>
                            <th className="py-2 border text-sm px-5 text-left">Location</th>
                            <th className="py-2 border text-sm px-5 text-left">Total Loans</th>
                            <th className="py-2 border text-sm px-5 text-left">Total Amount</th>
                            <th className="py-2 border text-sm px-5 text-right">#</th>
                        </tr>
                    </thead>
                    <tbody className='overflow-y-scroll'>
                        {
                            employees.length > 0 && employees.map((employee)=>(
                                <tr className='border-b' key={employee.id}>
                                    <td className="py-1 border text-sm px-5">{employee.id}</td>
                                    <td className="py-1 border text-sm px-5">{employee.name}</td>
                                    <td className="py-1 border text-sm px-5">{employee.mobile}</td>
                                    <td className="py-1 border text-sm px-5">{employee.location}</td>
                                    <td className="py-1 border text-sm px-5">{employee.totalLoan}</td>
                                    <td className="py-1 border text-sm px-5">{employee.totalAmt}</td>
                                    <td className="py-1 border text-sm px-5 text-right">
                                    <Button
                                        type='submit'
                                        disabled={false}
                                        onClick={() => changeModalStatus(employee)}
                                        className='bg-[#F44336] py-1 text-white focus:ring-0 focus:outline-none w-full font-semibold'
                                    >
                                        Edit
                                    </Button>
                                    </td>
                                </tr>
                            ))
                        } 
                    </tbody>
                </table>
            </div>
            <EmployeeDetailModal
                isOpen={isModalOpen}
                onChange={setIsModalOpen}
                modalWidth="60%"
                initialValues={initialValues}
                submitDetails={handleSubmitDetails}
            />
        </div>
    )
}

export default Employees