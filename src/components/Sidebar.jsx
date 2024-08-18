import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faCloud, faDashboard, faHome , faNoteSticky,faCalendarWeek, faPersonCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Define icon mappings
const iconMapping = {
    faHome: faHome,
    faCloud: faCloud,
    faDashboard: faDashboard,
    faNoteSticky:faNoteSticky,
    faCalendarWeek:faCalendarWeek,
    faPersonCircleQuestion:faPersonCircleQuestion
};

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('Dashboard');

    const handleClick = (link) => {
        setActiveLink(link);
    };

    const links = [
        {name: "Dashboard" , icon:'faHome', path: '/admin/dashboard'},
        {name: "Employees" , icon:'faCloud', path: '/admin/employees'},
        {name: "Customers" , icon:'faDashboard', path: '/admin/customers'},
        {name: "Loans" , icon:'faNoteSticky' , path:`/admin/loans`},
        {name: "Today's Data" , icon:'faCalendarWeek' , path:`/admin/todays`},
        {name: "Loan Requests" , icon:'faPersonCircleQuestion' , path:`/admin/requests`},
        {name: "Salary" , icon:'faCloud' , path:`/admin/salary`},
        {name:"Users", icon:'faCloud',path:`/admin/users`}
    ];

    return (
        <div className="bg-white shadow-sm fixed inset-y-0 z-50 my-4 overflow-y-scroll  w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100">
            <div className="flex flex-col px-6 py-8">
                <div className='text-center mb-4'>
                    <h3 className='font-bold text-xl'>Chaudhary Finance</h3>
                </div>
                {
                    links.map((link) => (
                        <Link 
                            key={link.name}
                            className={`rounded-lg py-1 text-center cursor-pointer mb-3 align-middle select-none font-sans font-bold transition-all text-xs w-full flex items-center gap-4 px-2 capitalize
                            ${activeLink === link.name ? 'bg-[#373737] text-white shadow-lg shadow-gray-900/20' : 'text-gray-700 hover:bg-[#eff2f3]  hover:text-gray-900'}`}
                            to={link.path}
                            onClick={() => handleClick(link.name)}
                        >
                            <div className='flex space-x-3 items-center py-2'>
                                <FontAwesomeIcon icon={iconMapping[link.icon]} fontSize={21} />
                                <h6 className='text-base font-medium'>{link.name}</h6>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default Sidebar;
