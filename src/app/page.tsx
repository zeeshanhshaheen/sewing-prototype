'use client';

import SvgUploader from './components/SvgUploader';

export default function HomePage() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center p-8 bg-gray-50'>
      <h1 className='text-4xl font-bold text-gray-800 mb-10'>
        Sewing Pattern 3D Visualizer
      </h1>
      <div>
        <SvgUploader />
      </div>
    </div>
  );
}
