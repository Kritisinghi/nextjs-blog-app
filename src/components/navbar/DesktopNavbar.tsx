import Link from "next/link";
import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const MainDesktopNavigation = () => {
    return (
        <>
            <nav className="mx-auto hidden max-w-5xl items-center justify-between px-2 py-4 md:flex">
                {/* Logo */}
                <div className="flex flex-1 justify-start pl-2">
                    <Link href="/">
                        Logo
                    </Link>
                </div>

                {/* Navigation */}
                <div>
                    <div className="flex flex-1 gap-x-6">
                        Navigation to be added
                    </div>
                </div>

                {/* Login Menu */}
                <div className="flex flex-1 justify-end">
                    <SignedOut>
                        <SignInButton mode="modal">Sign In </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
        </>
    );
};

export default MainDesktopNavigation;