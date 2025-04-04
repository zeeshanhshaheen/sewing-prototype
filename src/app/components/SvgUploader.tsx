'use client';

import React from 'react';

export default function SvgUploader() {
  const handleFrontUploadClick = () => {
    console.log('Front piece upload clicked');
  };

  const handleBackUploadClick = () => {
    console.log('Back piece upload clicked');
  };

  const handleContinue = () => {
    console.log('Continue clicked');
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-6 text-center w-[400px]'>
      <h2 className='text-2xl font-bold mb-1'>Upload Your Pattern</h2>
      <p className='text-gray-500 mb-6 text-sm'>Front and back SVGs only</p>
      <div
        onClick={handleFrontUploadClick}
        className='border-2 border-dashed border-gray-300 rounded p-4 mb-4 flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer'
      >
        <svg
          className='w-6 h-6 text-gray-400'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7.5 16.5l4.5-4.5 4.5 4.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path d='M12 12v7' strokeLinecap='round' strokeLinejoin='round' />
          <path
            d='M20 15.5a4.5 4.5 0 00-4.5-4.5h-.318a6.001 6.001 0 00-11.364 0H4.5A4.5 4.5 0 009 15.5h11z'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <span className='text-gray-500 mt-2'>Upload Front Piece</span>
      </div>

      <div
        onClick={handleBackUploadClick}
        className='border-2 border-dashed border-gray-300 rounded p-4 mb-4 flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer'
      >
        <svg
          className='w-6 h-6 text-gray-400'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7.5 16.5l4.5-4.5 4.5 4.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path d='M12 12v7' strokeLinecap='round' strokeLinejoin='round' />
          <path
            d='M20 15.5a4.5 4.5 0 00-4.5-4.5h-.318a6.001 6.001 0 00-11.364 0H4.5A4.5 4.5 0 009 15.5h11z'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <span className='text-gray-500 mt-2'>Upload Back Piece</span>
      </div>

      <button
        onClick={handleContinue}
        className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full'
      >
        Continue
      </button>
    </div>
  );
}
