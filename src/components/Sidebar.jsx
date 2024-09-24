import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faCloud, faDashboard, faHome , faNoteSticky,faCalendarWeek, faPersonCircleQuestion, faLocation, faLandmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const iconMapping = {
    faHome: faHome,
    faCloud: faCloud,
    faDashboard: faDashboard,
    faNoteSticky:faNoteSticky,
    faCalendarWeek:faCalendarWeek,
    faPersonCircleQuestion:faPersonCircleQuestion,
    faLandmark: faLandmark,
};

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('Dashboard');

    useEffect(() => {
        const savedActiveLink = localStorage.getItem('activeLink');
        if (savedActiveLink) {
            setActiveLink(savedActiveLink);
        }
    }, []);

    const handleClick = (link) => {
        setActiveLink(link);
        localStorage.setItem('activeLink', link); 
    };

    const links = [
        {name: "Dashboard" , icon:'faHome', path: '/admin/dashboard'},
        {name:"Users", icon:'faCloud',path:`/admin/users`},
        {name: "Employees" , icon:'faCloud', path: '/admin/employees'},
        {name: "Customers" , icon:'faDashboard', path: '/admin/customers'},
        {name: "Loans" , icon:'faNoteSticky' , path:`/admin/loans`},
        {name: "Daily Collection" , icon:'faCalendarWeek' , path:`/admin/dailycollections`},
        {name:"Transactions",icon:'faCalendarWeek' , path:`/admin/transactions`},
        {name: "Salary" , icon:'faCloud' , path:`/admin/salary`},
        {name:"Locations", icon:'faLandmark',path:`/admin/locations`},
        
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
