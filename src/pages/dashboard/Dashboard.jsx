import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../app/slices/dashboardSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTrendUp, faLandmark, faUser, faHourglassStart, faWallet, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import { getData } from '../../services/getData';

const getCurrentDateTimeString = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  };

const downloadDailyReport = async () => {
    try {
        // Fetch the Blob data
        const blob = await getData("/v1/generatepdf/daily-report", {
            responseType: 'blob' // Ensure binary data response
        });

        if (blob) {
            // Create a Blob URL for the PDF
            const url = window.URL.createObjectURL(blob); // No need to wrap blob again
            const filename = `todays_report_${getCurrentDateTimeString()}.pdf`;
            
            // Create a download link and trigger it
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename}`; // Set the filename
            document.body.appendChild(a);
            a.click();

            // Clean up
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } else {
            console.error('No data returned for download');
        }
    } catch (error) {
        console.error('Error downloading the report:', error);
    }
};



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
             <div className='bg-[#373737] rounded-md px-2 py-3 flex justify-between items-center'>
            <h2 className='text-white font-bold'>Dashboard</h2>
            <Button
                className='bg-blue-600 text-white focus:ring-0 focus:outline-none py-1 px-4 font-semibold'
                onClick={() => {downloadDailyReport()} 
                }
            >
                Download Report
            </Button>
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
                                        <td className="py-2 border-b border-blue-gray-50">{location.locationName}</td>
                                        <td className="py-2 border-b border-blue-gray-50">{location.loanCount}</td>
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
