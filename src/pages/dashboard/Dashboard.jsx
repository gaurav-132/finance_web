import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../app/slices/dashboardSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTrendUp, faLandmark, faUser, faHourglassStart, faWallet, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const dispatch = useDispatch();
    const {
        totalCollectionToday,
        totalLoans,
        totalLoanAmount,
        totalPendingAmount,
        totalNewLoans,
        topLocations,
        status,
        error
    } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchDashboardData());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="">
            <div className='bg-[#373737] rounded-md px-2 py-4'>
                <h2 className='text-white font-bold'>Dashboard</h2>
            </div>
            {status === 'pending' && 
                <div className='border px-2 py-2 rounded text-sm font-bold text-white bg-yellow-400'>Loading...</div>
            }
            {status === 'succeeded' && (
                <div>
                    <div className="grid grid-cols-3 gap-3 my-9">
                        <div className="flex p-7 items-center bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm justify-between">
                            <FontAwesomeIcon className="size-9" icon={faMoneyBillTrendUp} />
                            <div className='flex flex-col'>
                                <h1>Today's Collection</h1>
                                <p className='text-2xl'>Rs.{totalCollectionToday}</p>
                            </div>
                        </div>
                        <div className="flex p-7 items-center bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm justify-between">
                            <FontAwesomeIcon className="size-9" icon={faLandmark} />
                            <div className='flex flex-col'>
                                <h1>Active Loans</h1>
                                <p className='text-2xl'>{totalLoans}</p>
                            </div>
                        </div>
                        <div className="flex p-7 items-center bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm justify-between">
                            <FontAwesomeIcon className="size-9" icon={faUser} />
                            <div className='flex flex-col'>
                                <h1>New Loans</h1>
                                <p className='text-2xl'>{totalNewLoans}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 flex gap-x-6">
                        <div className="flex justify-between items-center p-7 py-10 bg-clip-border rounded-xl w-1/2 bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
                            <div className="flex flex-col">
                                <p className="text-2xl">Rs.{totalLoanAmount}</p>
                                <p className="text-xl">ACTIVE LOANS AMOUNT</p>
                            </div>
                            <FontAwesomeIcon className="size-9" icon={faWallet} />
                        </div>
                        <div className="flex justify-between items-center p-7 py-10 bg-clip-border rounded-xl w-1/2 bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
                            <div className="flex flex-col">
                                <p className="text-2xl">Rs.{totalPendingAmount}</p>
                                <p className="text-xl">AMOUNT TO BE RECOVERED</p>
                            </div>
                            <FontAwesomeIcon className="size-9" icon={faHourglassStart} />
                        </div>
                    </div>

                    <div className='flex gap-x-6'>
                        <div className="flex flex-col p-6 py-10 bg-clip-border rounded-xl w-1/2 bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
                            <div className="flex gap-3">
                                <FontAwesomeIcon className="size-6" icon={faLocationDot} />
                                <h2 className="text-2xl mb-2">TOP LOCATIONS</h2>
                            </div>
                            <table>
                                {topLocations.map((location, index) => (
                                    <tr key={index}>
                                        <td className="py-2 border-b border-blue-gray-50">{location.location}</td>
                                        <td className="py-2 border-b border-blue-gray-50">{location.count}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <div className="flex flex-col gap-2 p-4 bg-clip-border rounded-xl w-full bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
                                <p className="text-xl"><FontAwesomeIcon className="size-6" icon={faLocationDot} /> Recovered:  ₹2000000/ ₹10000000</p>
                                <progress value={75} max={100} className="w-full" />
                            </div>
                            <div className="flex justify-between items-center p-4 bg-clip-border rounded-xl w-full bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
                                <p className="text-xl"><FontAwesomeIcon className="size-6" icon={faLocationDot} /> Recovered: 90%</p>
                                <progress value={75} max={100} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
