'use client';
import React, { useRef, useState } from 'react';
import Notification from './Notification';
import UploadPlaceholder from './UploadPlaceholder';

interface SvgUploaderProps {
  title: string;
  subtitle: string;
  frontLabel: string;
  backLabel: string;
  onUpload: ({ front, back }: { front: string; back: string }) => void;
}

export default function SvgUploader({
  title,
  subtitle,
  frontLabel,
  backLabel,
  onUpload,
}: SvgUploaderProps) {
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);
  const [frontContent, setFrontContent] = useState<string | null>(null);
  const [backContent, setBackContent] = useState<string | null>(null);
  const [frontFileName, setFrontFileName] = useState<string>('');
  const [backFileName, setBackFileName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [frontNotification, setFrontNotification] = useState(false);
  const [backNotification, setBackNotification] = useState(false);

  const handleFrontUploadClick = () => {
    frontInputRef.current?.click();
  };

  const handleBackUploadClick = () => {
    backInputRef.current?.click();
  };

  const handleFrontFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => {
        setFrontContent(reader.result as string);
        setFrontFileName(file.name);
        setFrontNotification(true);
        setTimeout(() => setFrontNotification(false), 3000);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a valid SVG file for the front piece.');
    }
  };

  const handleBackFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => {
        setBackContent(reader.result as string);
        setBackFileName(file.name);
        setBackNotification(true);
        setTimeout(() => setBackNotification(false), 3000);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a valid SVG file for the back piece.');
    }
  };

  const handleContinue = () => {
    if (!frontContent || !backContent) {
      alert('Please upload both front and back SVG files.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onUpload({ front: frontContent, back: backContent });
    }, 1500);
  };

  return (
    <div className='relative bg-white rounded-lg shadow-md p-6 text-center w-[400px]'>
      <div className='fixed top-4 right-4 space-y-2 z-50'>
        {frontNotification && (
          <Notification
            message='Front file uploaded!'
            subMessage={frontFileName}
            onClose={() => setFrontNotification(false)}
          />
        )}
        {backNotification && (
          <Notification
            message='Back file uploaded!'
            subMessage={backFileName}
            onClose={() => setBackNotification(false)}
          />
        )}
      </div>
      <h2 className='text-2xl font-bold mb-1 text-blue-600'>{title}</h2>
      <p className='text-gray-500 mb-6 text-sm'>{subtitle}</p>
      <input
        type='file'
        accept='.svg'
        className='hidden'
        ref={frontInputRef}
        onChange={handleFrontFileChange}
      />
      <input
        type='file'
        accept='.svg'
        className='hidden'
        ref={backInputRef}
        onChange={handleBackFileChange}
      />
      <UploadPlaceholder
        label={frontLabel}
        fileName={frontFileName}
        onClick={handleFrontUploadClick}
      />
      <UploadPlaceholder
        label={backLabel}
        fileName={backFileName}
        onClick={handleBackUploadClick}
      />
      <button
        onClick={handleContinue}
        disabled={loading}
        className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full flex items-center justify-center'
      >
        {loading && (
          <svg
            className='animate-spin h-5 w-5 mr-2 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8v4.5A3.5 3.5 0 008.5 12H4z'
            />
          </svg>
        )}
        {loading ? 'Processing...' : 'Continue'}
      </button>
    </div>
  );
}
