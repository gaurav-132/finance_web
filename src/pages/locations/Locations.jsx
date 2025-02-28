import React, {useCallback, useEffect, useMemo, useState} from 'react';
import CreateOrUpdateLocationModal from '../../components/CreateOrUpdateLocationModal';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateLocation, fetchAllLocations } from '../../app/slices/locationSlice';
import Pagination from '../../components/Pagination';
import Button from '../../components/Button';
import { toast } from 'react-toastify';


function Locations() {  
    const [addLocationModalStatus, setAddLocationModalStatus] = useState(false);
    const [locationObject, setLocationObject] = useState({id: 0, locationName: ''});
    const dispatch = useDispatch();
    const {locations, total, limit, page, status} = useSelector(state => state.locations);

    const filterData = useMemo(() => ({
        total,
        limit,
        page,
        allocatedLocationId:0,
        employeeName:'',
    }), [total,limit,page]);
    
    console.log("location render")
    const handlePageChange = useCallback((newPage) => {
        filterData.page = newPage;
        dispatch(fetchAllLocations(filterData));
    },[]);

    const handleSubmit = async (values) => {
        try {
            const response = await dispatch(createOrUpdateLocation(values)).unwrap();
            toast.success(response, {
                position: "top-center",
                autoClose: 3000,
            });
            dispatch(fetchAllLocations(filterData));
        } catch (error){
            toast.warning(error.message, {
                position: "top-center",
                autoClose: 3000,
            });
        }
      };

    const changeModalStatus = (location) => {
        setLocationObject(location);
        console.log(locationObject);
        setAddLocationModalStatus(true);
    }

    const changeAddLocationModalStatus = () => {
        setLocationObject({id: 0, locationName: ''});
        setAddLocationModalStatus(true);
    }

    useEffect(() => {
        dispatch(fetchAllLocations(filterData));
    }, [dispatch]);


    return (
        <div className="">
            <div className='bg-[#373737] rounded-md px-2 py-4 flex justify-between items-center'>
                <h2 className='text-white font-bold'>Locations</h2>
                <Button
                className='bg-blue-600 text-white focus:ring-0 focus:outline-none py-1 px-4 font-semibold'
                onClick={() => {changeAddLocationModalStatus()} 
                }
                >
                    Add Location
                </Button>                
            </div>
            <div className=''>
                {
                    status === 'loading' && 
                    <div className='border px-2 py-2 rounded text-sm font-bold text-white bg-yellow-400'>Loading...</div>
                }
                {
                    status === 'succeeded' && locations.length === 0 && 
                    <div className='border my-2 px-2 py-2 rounded text-sm font-bold text-white bg-red-600'>No Location Found</div>
                }
                {
                    status === 'succeeded' && locations.length > 0 && (
                        <div>
                            <Pagination
                                page={page}
                                limit={limit}
                                handlePageChange={handlePageChange}
                                total={total}
                            />
                            <table className='w-full border'>
                                <thead>
                                    <tr className='border-b'>
                                        <th className="py-2 border text-sm px-5 text-left">Id</th>
                                        <th className="py-2 border text-sm px-5 text-left">Name</th>
                                        <th className="py-2 border text-sm px-5 text-right">#</th>
                                    </tr>
                                </thead>
                                <tbody className='overflow-y-scroll'>
                                    {locations.slice(0,10).map((location, index) => (
                                        <tr className='border-b' key={index}>
                                            <td className="py-1 border text-sm px-5">{index+1}</td>
                                            <td className="py-1 border text-sm px-5">{location.locationName}</td>
                                            <td className="py-1 border text-sm px-5 text-right">
                                                <Button
                                                    type='submit'
                                                    disabled={false}
                                                    onClick={() => changeModalStatus(location)}
                                                    className='bg-[#F44336] py-1 text-white focus:ring-0 focus:outline-none  font-semibold'
                                                >
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>)
                    }   
            </div>
            <CreateOrUpdateLocationModal
                isModalOpen={addLocationModalStatus}
                location={locationObject}
                onChange={setAddLocationModalStatus}
                modalWidth="40%"
                height="250px"
                submitDetails={handleSubmit}
            />
        </div>
    )
}

export default Locations