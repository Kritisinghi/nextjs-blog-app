'use client'
import { useEffect, useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useAuth, SignInButton, useClerk, useSession } from '@clerk/nextjs';
import Image from 'next/image';

const NavbarWithSideDrawer = () => {
    const { signOut } = useClerk();
    const { isSignedIn } = useAuth();
    const {session} = useSession();
    const drawerRef = useRef<HTMLDivElement | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);

    const handleSignOut = async (): Promise<void> => {
        await signOut();
        setIsProfileMenuOpen(false);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (drawerRef.current && event.target instanceof HTMLElement && !drawerRef.current.contains(event.target)) {
            setIsDrawerOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div ref={drawerRef}>
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
                        <Link href="/blogs/feeds" onClick={() => setIsDrawerOpen(false)} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-200">Feeds</Link>
                        <Link href="/blogs/myBlogs" onClick={() => setIsDrawerOpen(false)} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-200">My Blogs</Link>
                        <Link href="/blogs/editor" onClick={() => setIsDrawerOpen(false)} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-200">Create</Link>
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
                        <h1 className="text-xl font-bold text-gray-700">Blogo</h1>
                        {isSignedIn &&
                            <nav className='hidden md:flex space-x-4'>
                                <Link href="/blogs/feeds" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-200">Feeds</Link>
                                <Link href="/blogs/myBlogs" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-200">My Blogs</Link>
                                <Link href="/blogs/editor" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-200">Create</Link>
                            </nav>
                        }
                        {/* Profile Avatar */}
                        <div className="relative inline-block">
                            {isSignedIn ?
                                <button
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <Image src={session?.user.imageUrl ?? ''} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-gray-300" width={50} height={50} />
                                    <span className="hidden md:inline-block font-medium text-gray-700">{session?.user.firstName ?? 'Profile'}</span>
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
                                className="absolute -right-4 w-48 mt-2 bg-white rounded-md shadow-lg"
                            >
                                <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleSignOut}>Logout</button>
                            </Transition>
                        </div>
                    </header>
                </div>
            </div>
        </>
    );
}

export default NavbarWithSideDrawer;
