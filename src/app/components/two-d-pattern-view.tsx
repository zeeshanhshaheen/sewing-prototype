// components/TwoDPatternView.tsx
'use client';

import React, { useState } from 'react';
import { Scissors, X } from 'lucide-react';

interface SewingPoint {
  x: number;
  y: number;
  piece: string;
  id: number;
}

interface SewingPair {
  front: SewingPoint;
  back: SewingPoint;
}

interface TwoDPatternViewProps {
  frontPieceData: string | null;
  backPieceData: string | null;
  sewingPairs: SewingPair[];
  setSewingPairs: (pairs: SewingPair[]) => void;
  tempPoint: SewingPoint | null;
  setTempPoint: (point: SewingPoint | null) => void;
}

export default function TwoDPatternView({
  frontPieceData,
  backPieceData,
  sewingPairs,
  setSewingPairs,
  tempPoint,
  setTempPoint,
}: TwoDPatternViewProps) {
  const containerWidth = 400;
  const wrapperWidth = containerWidth * 2;
  const wrapperHeight = 500;
  const [hoveredPair, setHoveredPair] = useState<number | null>(null);

  const handleClick = (e: React.MouseEvent, piece: 'front' | 'back') => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newPoint = { x, y, piece, id: Date.now() };

    if (!tempPoint) {
      setTempPoint(newPoint);
    } else {
      if (tempPoint.piece !== piece) {
        const newPair = {
          front: tempPoint.piece === 'front' ? tempPoint : newPoint,
          back: tempPoint.piece === 'back' ? tempPoint : newPoint,
        };
        setSewingPairs([...sewingPairs, newPair]);
        setTempPoint(null);
      } else {
        setTempPoint(newPoint);
      }
    }
  };

  const removePair = (index: number) => {
    const newPairs = [...sewingPairs];
    newPairs.splice(index, 1);
    setSewingPairs(newPairs);
  };

  const renderMarkers = () => {
    const markers = [];

    if (tempPoint) {
      const abs = {
        x:
          tempPoint.piece === 'front'
            ? tempPoint.x
            : tempPoint.x + containerWidth,
        y: tempPoint.y,
      };
      markers.push(
        <circle
          key={`temp-${tempPoint.id}`}
          cx={abs.x}
          cy={abs.y}
          r='6'
          fill='rgba(59, 130, 246, 0.8)'
          stroke='white'
          strokeWidth='2'
        />
      );
    }

    sewingPairs.forEach((pair, idx) => {
      const absFront = { x: pair.front.x, y: pair.front.y };
      const absBack = { x: pair.back.x + containerWidth, y: pair.back.y };
      const isHovered = hoveredPair === idx;
      const markerSize = isHovered ? 8 : 6;
      const markerColor = isHovered
        ? 'rgba(239, 68, 68, 0.8)'
        : 'rgba(59, 130, 246, 0.8)';

      markers.push(
        <circle
          key={`f-${idx}`}
          cx={absFront.x}
          cy={absFront.y}
          r={markerSize}
          fill={markerColor}
          stroke='white'
          strokeWidth='2'
        />
      );

      markers.push(
        <circle
          key={`b-${idx}`}
          cx={absBack.x}
          cy={absBack.y}
          r={markerSize}
          fill={markerColor}
          stroke='white'
          strokeWidth='2'
        />
      );
    });

    return markers;
  };

  const renderSewingLines = () => {
    return sewingPairs.map((pair, idx) => {
      const absFront = { x: pair.front.x, y: pair.front.y };
      const absBack = { x: pair.back.x + containerWidth, y: pair.back.y };
      const isHovered = hoveredPair === idx;
      const lineColor = isHovered
        ? 'rgba(239, 68, 68, 0.8)'
        : 'rgba(59, 130, 246, 0.6)';
      const lineWidth = isHovered ? 3 : 2;
      const dashArray = isHovered ? '5,5' : 'none';

      return (
        <g
          key={idx}
          onMouseEnter={() => setHoveredPair(idx)}
          onMouseLeave={() => setHoveredPair(null)}
        >
          <line
            x1={absFront.x}
            y1={absFront.y}
            x2={absBack.x}
            y2={absBack.y}
            stroke={lineColor}
            strokeWidth={lineWidth}
            strokeDasharray={dashArray}
          />
          {isHovered && (
            <g
              onClick={e => {
                e.stopPropagation();
                removePair(idx);
              }}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={(absFront.x + absBack.x) / 2}
                cy={(absFront.y + absBack.y) / 2}
                r='12'
                fill='white'
                stroke='rgba(239, 68, 68, 0.8)'
                strokeWidth='2'
              />
              <foreignObject
                x={(absFront.x + absBack.x) / 2 - 8}
                y={(absFront.y + absBack.y) / 2 - 8}
                width='16'
                height='16'
              >
                <div className='flex items-center justify-center w-full h-full'>
                  <X className='w-4 h-4 text-red-500' />
                </div>
              </foreignObject>
            </g>
          )}
        </g>
      );
    });
  };

  return (
    <div>
      <div className='mb-4 flex items-center'>
        <Scissors className='w-5 h-5 text-blue-500 mr-2' />
        <p className='text-sm text-gray-600'>
          {tempPoint
            ? `Now click on the ${
                tempPoint.piece === 'front' ? 'back' : 'front'
              } piece to complete the sewing pair`
            : 'Click on corresponding points in both pieces to create sewing pairs'}
        </p>
      </div>

      <div
        className='relative border border-gray-300 rounded-lg overflow-hidden bg-white'
        style={{ width: `${wrapperWidth}px`, height: `${wrapperHeight}px` }}
      >
        <div
          onClick={e => handleClick(e, 'front')}
          className={`absolute top-0 left-0 ${
            frontPieceData
              ? 'border-r border-gray-300'
              : 'border-r border-dashed border-red-300'
          }`}
          style={{
            width: `${containerWidth}px`,
            height: `${wrapperHeight}px`,
            cursor: 'crosshair',
          }}
        >
          <div
            className='w-full h-full pointer-events-none'
            dangerouslySetInnerHTML={{ __html: frontPieceData || '' }}
          />
          {!frontPieceData && (
            <div className='absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-80'>
              <p className='text-gray-500 text-sm'>Front piece not uploaded</p>
            </div>
          )}
          <div className='absolute top-2 left-2 bg-white bg-opacity-80 px-2 py-1 rounded text-xs font-medium text-gray-700'>
            Front Piece
          </div>
        </div>

        <div
          onClick={e => handleClick(e, 'back')}
          className={`absolute top-0 right-0 ${
            backPieceData ? '' : 'border-l border-dashed border-red-300'
          }`}
          style={{
            width: `${containerWidth}px`,
            height: `${wrapperHeight}px`,
            left: `${containerWidth}px`,
            cursor: 'crosshair',
          }}
        >
          <div
            className='w-full h-full pointer-events-none'
            dangerouslySetInnerHTML={{ __html: backPieceData || '' }}
          />
          {!backPieceData && (
            <div className='absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-80'>
              <p className='text-gray-500 text-sm'>Back piece not uploaded</p>
            </div>
          )}
          <div className='absolute top-2 right-2 bg-white bg-opacity-80 px-2 py-1 rounded text-xs font-medium text-gray-700'>
            Back Piece
          </div>
        </div>

        <svg
          className='absolute top-0 left-0 pointer-events-none'
          style={{ width: `${wrapperWidth}px`, height: `${wrapperHeight}px` }}
        >
          {renderSewingLines()}
          {renderMarkers()}
        </svg>
      </div>

      <div className='mt-4'>
        <div className='flex items-center justify-between'>
          <p className='text-sm text-gray-700'>
            {sewingPairs.length > 0
              ? `Defined sewing pairs: ${sewingPairs.length}`
              : 'No sewing pairs defined yet'}
          </p>
          {sewingPairs.length > 0 && (
            <button
              onClick={() => setSewingPairs([])}
              className='text-xs text-red-500 hover:text-red-700'
            >
              Clear all pairs
            </button>
          )}
        </div>
        {sewingPairs.length > 0 && sewingPairs.length < 2 && (
          <p className='text-xs text-amber-600 mt-1'>
            Define at least 2 sewing pairs for better 3D visualization
          </p>
        )}
      </div>
    </div>
  );
}
