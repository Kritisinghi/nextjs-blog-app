'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';

const Error = ({ error }: { error: Error }) => {
  useEffect(() => {
    // Log the error to your logger
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100 text-red-800 font-sans text-center">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
        <p className="text-lg mb-8">We're sorry for the inconvenience. Please try refreshing the page or come back later.</p>
      </div>
      <Link href={'/'} className="inline-block px-6 py-3 text-lg bg-blue-600 text-white rounded-lg border-2 border-blue-700 hover:bg-blue-700 hover:scale-105 transition-all active:bg-blue-800">
        Refresh
      </Link>
    </div>
  );
};

export default Error;
