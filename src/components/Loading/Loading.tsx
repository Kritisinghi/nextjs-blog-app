import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative">
        <div className="spinner-border border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-xl">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loading;