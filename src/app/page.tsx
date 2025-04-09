'use client';

import { useState } from 'react';
import PatternUploader from './components/pattern-uploader';
import TwoDPatternView from './components/two-d-pattern-view';
import EnhancedThreeDPreview from './components/enhanced-three-d-preview';

export default function Home() {
  const [frontPieceData, setFrontPieceData] = useState<string | null>(null);
  const [backPieceData, setBackPieceData] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sewingPairs, setSewingPairs] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tempPoint, setTempPoint] = useState<any>(null);

  return (
    <div className='container mx-auto px-4 py-8 max-w-6xl'>
      <h1 className='text-3xl font-bold mb-6 text-gray-800'>
        3D Sewing Pattern Assembly
      </h1>

      <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
        <PatternUploader
          frontPieceData={frontPieceData}
          setFrontPieceData={setFrontPieceData}
          backPieceData={backPieceData}
          setBackPieceData={setBackPieceData}
        />
      </div>

      {/*
        Use a responsive 2-column grid, which collapses to 1 column on smaller screens
        (md or below).
      */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
          <h2 className='text-xl font-semibold mb-4 text-gray-700'>
            2D Pattern View
          </h2>
          <TwoDPatternView
            frontPieceData={frontPieceData}
            backPieceData={backPieceData}
            sewingPairs={sewingPairs}
            setSewingPairs={setSewingPairs}
            tempPoint={tempPoint}
            setTempPoint={setTempPoint}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-2'>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-xl font-semibold mb-4 text-gray-700'>
            3D Assembled View
          </h2>
          <EnhancedThreeDPreview
            frontPieceData={frontPieceData}
            backPieceData={backPieceData}
            sewingPairs={sewingPairs}
          />
        </div>
      </div>

      <div className='mt-8 bg-blue-50 rounded-lg p-6 shadow-sm'>
        <h2 className='text-xl font-semibold mb-2 text-blue-800'>How to Use</h2>
        <ol className='list-decimal pl-5 space-y-2 text-gray-700'>
          <li>Upload your front and back pattern pieces as SVG files</li>
          <li>
            Click on corresponding edges in both pattern pieces to create sewing
            pairs
          </li>
          <li>
            Define at least 2 sewing points on each pattern piece to create the
            3D visualization
          </li>
          <li>Use your mouse to rotate, pan, and zoom the 3D view</li>
          <li>
            Toggle between assembled view and separate pieces with the button
          </li>
          <li>
            Try both visualization methods to see which better represents your
            pattern
          </li>
        </ol>
      </div>
    </div>
  );
}
