'use client';

import type React from 'react';

import { useState } from 'react';
import { Upload, Check, AlertCircle } from 'lucide-react';

interface PatternUploaderProps {
  frontPieceData: string | null;
  setFrontPieceData: (data: string | null) => void;
  backPieceData: string | null;
  setBackPieceData: (data: string | null) => void;
}

const PatternUploader = ({
  frontPieceData,
  setFrontPieceData,
  backPieceData,
  setBackPieceData,
}: PatternUploaderProps) => {
  const [frontError, setFrontError] = useState<string | null>(null);
  const [backError, setBackError] = useState<string | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPieceData: (data: string | null) => void,
    setError: (error: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    console.log('File:', file); // Debugging line
    if (!file) return;

    // Validate file type
    if (file.type !== 'image/svg+xml') {
      setError('Please upload an SVG file');
      return;
    }

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const result = event.target?.result as string;
        if (result) {
          // Basic validation that it's an SVG
          if (!result.includes('<svg')) {
            setError('Invalid SVG file');
            return;
          }
          setPieceData(result);
          setError(null);
        }
      } catch (error) {
        setError('Error reading file');
        console.error(error);
      }
    };
    reader.onerror = () => {
      setError('Error reading file');
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4 text-gray-700'>
        Upload Pattern Pieces
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Front Piece Upload */}
        <div className='relative'>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors
            ${
              frontPieceData
                ? 'border-green-300 bg-green-50'
                : frontError
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input
              type='file'
              accept='.svg'
              onChange={e =>
                handleFileChange(e, setFrontPieceData, setFrontError)
              }
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              aria-label='Upload front piece pattern'
            />

            <div className='flex flex-col items-center justify-center space-y-2'>
              {frontPieceData ? (
                <>
                  <div className='w-12 h-12 rounded-full bg-green-100 flex items-center justify-center'>
                    <Check className='w-6 h-6 text-green-600' />
                  </div>
                  <span className='text-sm font-medium text-green-600'>
                    Front Piece Uploaded
                  </span>
                  <span className='text-xs text-gray-500'>
                    Click to replace
                  </span>
                </>
              ) : frontError ? (
                <>
                  <div className='w-12 h-12 rounded-full bg-red-100 flex items-center justify-center'>
                    <AlertCircle className='w-6 h-6 text-red-600' />
                  </div>
                  <span className='text-sm font-medium text-red-600'>
                    {frontError}
                  </span>
                  <span className='text-xs text-gray-500'>
                    Click to try again
                  </span>
                </>
              ) : (
                <>
                  <div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center'>
                    <Upload className='w-6 h-6 text-gray-600' />
                  </div>
                  <span className='text-sm font-medium text-gray-700'>
                    Upload Front Piece
                  </span>
                  <span className='text-xs text-gray-500'>SVG files only</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Back Piece Upload */}
        <div className='relative'>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors
            ${
              backPieceData
                ? 'border-green-300 bg-green-50'
                : backError
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input
              type='file'
              accept='.svg'
              onChange={e =>
                handleFileChange(e, setBackPieceData, setBackError)
              }
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              aria-label='Upload back piece pattern'
            />

            <div className='flex flex-col items-center justify-center space-y-2'>
              {backPieceData ? (
                <>
                  <div className='w-12 h-12 rounded-full bg-green-100 flex items-center justify-center'>
                    <Check className='w-6 h-6 text-green-600' />
                  </div>
                  <span className='text-sm font-medium text-green-600'>
                    Back Piece Uploaded
                  </span>
                  <span className='text-xs text-gray-500'>
                    Click to replace
                  </span>
                </>
              ) : backError ? (
                <>
                  <div className='w-12 h-12 rounded-full bg-red-100 flex items-center justify-center'>
                    <AlertCircle className='w-6 h-6 text-red-600' />
                  </div>
                  <span className='text-sm font-medium text-red-600'>
                    {backError}
                  </span>
                  <span className='text-xs text-gray-500'>
                    Click to try again
                  </span>
                </>
              ) : (
                <>
                  <div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center'>
                    <Upload className='w-6 h-6 text-gray-600' />
                  </div>
                  <span className='text-sm font-medium text-gray-700'>
                    Upload Back Piece
                  </span>
                  <span className='text-xs text-gray-500'>SVG files only</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternUploader;
