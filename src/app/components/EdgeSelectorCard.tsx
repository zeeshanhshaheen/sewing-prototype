'use client';
import React from 'react';
import SvgViewer from './SvgViewer';

interface EdgeSelectorCardProps {
  frontSvg: string;
  backSvg: string;
  onEdgeSelect: (edgeData: {
    d: string | null;
    type: 'front' | 'back';
  }) => void;
}

export default function EdgeSelectorCard({
  frontSvg,
  backSvg,
  onEdgeSelect,
}: EdgeSelectorCardProps) {
  return (
    <div className='w-full max-w-3xl bg-white border border-gray-200 rounded shadow-md p-6'>
      <h2 className='text-2xl font-bold mb-4 text-blue-600 text-center'>
        Select Edges
      </h2>
      <p className='text-gray-600 text-center mb-6'>
        Click edges to highlight them for sewing lines.
      </p>
      <div className='flex flex-col md:flex-row gap-8 justify-center'>
        {frontSvg && (
          <div className='flex flex-col items-center w-full md:w-1/2'>
            <h3 className='text-lg font-semibold mb-2 text-center'>
              Front Piece
            </h3>
            <SvgViewer
              svgContent={frontSvg}
              type='front'
              onEdgeSelect={onEdgeSelect}
            />
          </div>
        )}
        {backSvg && (
          <div className='flex flex-col items-center w-full md:w-1/2'>
            <h3 className='text-lg font-semibold mb-2 text-center'>
              Back Piece
            </h3>
            <SvgViewer
              svgContent={backSvg}
              type='back'
              onEdgeSelect={onEdgeSelect}
            />
          </div>
        )}
      </div>
    </div>
  );
}
