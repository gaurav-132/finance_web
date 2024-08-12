import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {

    const authState = useSelector((state) => state.auth);
    console.log('authSTate :' + authState.user);
    return (
        <div className="">
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Dashboard</h2>
            </div>
            <div></div>
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Dashboard</h2>
            </div>
            <div></div>
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Dashboard</h2>
            </div>
            <div></div>
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Dashboard</h2>
            </div>
            <div></div>
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Dashboard</h2>
            </div>
            <div></div>
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Dashboard</h2>
            </div>
            <div></div>
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Dashboard</h2>
            </div>
            <div></div>
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Dashboard</h2>
            </div>
            <div></div>
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Dashboard</h2>
            </div>
            <div></div>
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Dashboard</h2>
            </div>
            <div></div>
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Dashboard</h2>
            </div>
            <div></div>
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Dashboard</h2>
            </div>
            <div></div>
        </div>
    )
}

export default Dashboard