import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';



const AdminLayout = () => {
    
    const isAuthenticated = false;
    return (
        <div className="flex flex-col bg-[#F9FAFB] h-screen">
            {/* <Header /> */}
            <div className='flex justify-evenly flex-1 w-full py-8 px-10 overflow-hidden '>
                <div className='hidden md:blocfixed top-0 bottom-0 w-[26%] md:block'>
                    <Sidebar />
                </div>
                <div className='flex-1 w-[70%] flex flex-col overflow-hidden '>
                    <div className="bg-white overflow-auto px-6 py-8 shadow-sm fixed inset-y-0 z-50 my-4 w-[900px] rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100">
                        <Outlet />  
                    </div>  
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
