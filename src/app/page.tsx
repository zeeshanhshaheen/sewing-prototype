'use client';

import SvgUploader from './components/SvgUploader';

export default function HomePage() {
  const handleUpload = ({ front, back }: { front: string; back: string }) => {
    console.log('Front SVG Content:', front);
    console.log('Back SVG Content:', back);
  };
  return (
    <div className='min-h-screen flex flex-col justify-center items-center p-8 bg-gray-50'>
      <h1 className='text-4xl font-bold text-gray-800 mb-10'>
        Sewing Pattern 3D Visualizer
      </h1>
      <div>
        <SvgUploader
          title='Upload Your Pattern'
          subtitle='Front and back SVGs only'
          frontLabel='Upload Front Piece'
          backLabel='Upload Back Piece'
          onUpload={handleUpload}
        />
      </div>
    </div>
  );
}
