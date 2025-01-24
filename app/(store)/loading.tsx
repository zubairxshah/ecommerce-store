import LoadingSpinner from '@/components/Loader';
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoadingSpinner />
      <div className="ml-4 text-lg font-semibold text-gray-700">
        Loading...
      </div>
    </div>
  );
};

export default Loading;