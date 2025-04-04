'use client';
import React from 'react';

interface UploadPlaceholderProps {
  label: string;
  fileName?: string;
  onClick: () => void;
}

export default function UploadPlaceholder({
  label,
  fileName,
  onClick,
}: UploadPlaceholderProps) {
  return (
    <div
      onClick={onClick}
      className='border-2 border-dashed border-gray-300 rounded p-4 mb-4 flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer'
    >
      <img src='/icon/upload.svg' alt='Upload icon' className='w-10 h-10' />
      <span className='text-gray-500 mt-2'>{fileName || label}</span>
    </div>
  );
}
