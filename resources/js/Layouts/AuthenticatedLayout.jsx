import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import {
    BellIcon,
    CheckCircleIcon,
    ClipboardDocumentListIcon,
    PlusCircleIcon,
    ViewfinderCircleIcon,
} from '@heroicons/react/16/solid';

export default function AuthenticatedLayout({ header, children }) {
    const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { auth } = usePage().props;

    const user = auth.user;
    const roles = auth.roles || [];

    const isRequester = roles.includes('requester');
    const isApprover = roles.includes('bac_approver');
    const isSupplyOfficer = roles.includes('suply_officer');
    const isAdmin = roles.includes('admin');

    const toggleDropdownPR = () => setIsPurchaseOpen(!isPurchaseOpen);

    return (
        <div className="min-h-screen flex bg-blue-50">
            {/* Sidebar */}
            <aside className={`bg-gray-900 text-white shadow-md transition-transform duration-300 ease-in-out 
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                w-64 fixed sm:static z-50 min-h-screen`}>

                <div className="p-4 border-b border-gray-800">
                    <Link href="/">
                        <img
                            src="https://depedrizal.ph/wp-content/uploads/2018/08/deped-logo.png"
                            alt="DepEd Logo"
                            className="w-20 mx-auto"
                        />
                    </Link>
                </div>

                <nav className="p-4 space-y-2">
                    <NavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        className="block px-4 py-2 rounded hover:bg-gray-800 w-full hover:border-gray-300 "
                    >
                        Dashboard
                    </NavLink>

                    {/* Purchase Request Dropdown */}
                    <div>
                        <div
                            onClick={toggleDropdownPR}
                            className="flex items-center justify-between p-2.5 px-4 rounded-md hover:bg-gray-800 cursor-pointer"
                        >
                            <span className="flex items-center gap-2 font-bold text-sm">
                                <ClipboardDocumentListIcon className="w-5" />
                                Purchase Request
                            </span>
                            <i className={`bi bi-chevron-${isPurchaseOpen ? 'up' : 'down'} text-sm`} />
                        </div>

                        {isPurchaseOpen && (
                            <div className="ml-8 mt-2 space-y-1 text-sm font-medium">
                                <NavLink href={route('requester.create')} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 w-full">
                                    <PlusCircleIcon className="w-5" /> Create Request
                                </NavLink>
                                <NavLink href={route('requester.index')} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 w-full">
                                    <ViewfinderCircleIcon className="w-5" /> View Requests
                                </NavLink>
                                <NavLink className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 w-full">
                                    <CheckCircleIcon className="w-5" /> Approvals
                                </NavLink>
                            </div>
                        )}
                    </div>

                    {/* Notification */}
                    <NavLink className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 text-slate-100 w-full">
                        <BellIcon className="w-5" />
                        Notification
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <nav className="bg-white border-b border-gray-100 py-4 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                        {/* Optional sidebar toggle button (if needed for mobile) */}
                        {/* 
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-gray-600 hover:text-gray-800 sm:hidden"
                        >
                            <Bars3Icon className="w-6 h-6" />
                        </button> 
                        */}

                        <div className="hidden sm:block">
                            <span className="text-lg font-semibold">
                                Welcome, {user.firstname + ' ' + user.lastname}
                            </span>
                        </div>

                        <div className="flex items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                                        {user.email}
                                        <svg
                                            className="ml-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </nav>

                {/* Page Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
