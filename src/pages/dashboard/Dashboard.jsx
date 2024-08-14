import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { faMoneyBillTrendUp,faLandmark,faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux'


const Dashboard = () => {

    const authState = useSelector((state) => state.auth);
    console.log('authSTate :' + authState.user);
    return (
        <div className="">
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Dashboard</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-3 my-9">
                <div className="flex p-7 items-center  bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm justify-between">
                    <FontAwesomeIcon className="size-9" icon={faMoneyBillTrendUp} />
                    <div className='flex flex-col'>
                        <h1>Today's Collection</h1>
                        <p className='text-2xl'>Rs 40,000</p>
                    </div>
                </div> 
                <div className="flex p-7 items-center  bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm justify-between">
                    <FontAwesomeIcon className="size-9" icon={faLandmark} />
                    <div className='flex flex-col'>
                        <h1>Active Loans</h1>
                        <p className='text-2xl'>2000</p>
                    </div>
                </div> 
                <div className="flex p-7 items-center  bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm justify-between">
                    <FontAwesomeIcon className="size-9" icon={faUser} />
                    <div className='flex flex-col'>
                        <h1>New Loans</h1>
                        <p className='text-2xl'>4</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard