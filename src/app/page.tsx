'use client';

import { useState } from 'react';
import SvgUploader from './components/SvgUploader';
import EdgeSelectorCard from './components/EdgeSelectorCard';

export default function HomePage() {
  const [frontSvg, setFrontSvg] = useState<string | null>(null);
  const [backSvg, setBackSvg] = useState<string | null>(null);
  const [showViewer, setShowViewer] = useState(false);
  const [selectedEdges, setSelectedEdges] = useState<
    { d: string | null; type: 'front' | 'back' }[]
  >([]);

  const handleUpload = ({ front, back }: { front: string; back: string }) => {
    setFrontSvg(front);
    setBackSvg(back);
    setShowViewer(true);
  };

  const handleEdgeSelect = (edgeData: {
    d: string | null;
    type: 'front' | 'back';
  }) => {
    console.log('Edge selected:', edgeData);
    setSelectedEdges(prev => [...prev, edgeData]);
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50'>
      <h1 className='text-4xl font-bold text-gray-800 mb-10'>
        Sewing Pattern 3D Visualizer
      </h1>
      {!showViewer ? (
        <SvgUploader
          title='Upload Your Pattern'
          subtitle='Front and back SVGs only'
          frontLabel='Upload Front Piece'
          backLabel='Upload Back Piece'
          onUpload={handleUpload}
        />
      ) : (
        <EdgeSelectorCard
          frontSvg={frontSvg!}
          backSvg={backSvg!}
          onEdgeSelect={handleEdgeSelect}
        />
      )}
    </div>
  );
}
