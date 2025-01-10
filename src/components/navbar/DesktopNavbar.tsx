'use client'
import { useState } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useAuth, SignInButton, useClerk } from '@clerk/nextjs';


const NavbarWithSideDrawer = () => {
    const { signOut } = useClerk();
    const { isSignedIn, isLoaded } = useAuth();

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);

    const handleSignOut = async (): Promise<void> => {
        await signOut();
        setIsProfileMenuOpen(false);
    }

    return (
        <>
        {isLoaded ?
        <div>
            {/* Side Drawer */}
            <Transition
                show={isDrawerOpen}
                enter="transition-transform transform duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition-transform transform duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
                as="div"
                className="fixed inset-y-0 left-0 bg-blue-800 text-white w-64 space-y-6 py-7 px-2 z-40"
            >
                <h2 className="text-2xl font-bold text-center">Navigation</h2>
                <nav>
                    <Link href="/feeds" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-200">Feeds</Link>
                    <Link href="/myBlogs" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-200">My Blogs</Link>
                </nav>
            </Transition>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <header className="flex items-center justify-between bg-white py-4 px-6 shadow-md">
                    {/* Hamburger Icon */}
                    <button
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                        className="text-gray-600 focus:outline-none md:hidden"
                    >
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Title */}
                    <h1 className="text-xl font-bold text-gray-700">My Website</h1>
                    {isSignedIn &&
                        <nav className='hidden md:flex space-x-4'>
                            <Link href="/blogs/feeds" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-200">Feeds</Link>
                            <Link href="/blogs/myBlogs" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-200">My Blogs</Link>
                        </nav>
                    }               
                    {/* Profile Avatar */}
                    <div className="relative inline-block">
                        {isSignedIn ?
                            <button
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                className="flex items-center space-x-2 focus:outline-none"
                            >
                                <img src="https://via.placeholder.com/40" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-gray-300" />
                                <span className="hidden md:inline-block font-medium text-gray-700">Profile</span>
                            </button>
                            : <SignInButton />
                        }
                        {/* Dropdown Menu */}
                        <Transition
                            show={isProfileMenuOpen}
                            enter="transition-opacity duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            as="div"
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg"
                        >
                            {/* <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit Profile</a> */}
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleSignOut}>Logout</button>
                        </Transition>
                    </div>
                </header>
            </div>
        </div> :
        <div>Loading</div>
                    }
                    </>
    );
}

export default NavbarWithSideDrawer;
