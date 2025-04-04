'use client';
import React, { useEffect, useRef } from 'react';

interface SvgViewerProps {
  svgContent: string;
  type: 'front' | 'back';
  onEdgeSelect: (edgeData: {
    d: string | null;
    type: 'front' | 'back';
  }) => void;
}

interface ExtendedSVGPathElement extends SVGPathElement {
  _clickHandler?: (e: Event) => void;
}

export default function SvgViewer({
  svgContent,
  type,
  onEdgeSelect,
}: SvgViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const svg = container.querySelector('svg');
    if (!svg) return;
    const paths = svg.querySelectorAll('path');
    paths.forEach(path => {
      path.style.cursor = 'pointer';
      const clickHandler = (e: Event) => {
        e.stopPropagation();
        path.classList.toggle('selected-edge');
        const edgeData = { d: path.getAttribute('d'), type };
        onEdgeSelect(edgeData);
      };
      path.addEventListener('click', clickHandler);
      const extendedPath = path as ExtendedSVGPathElement;
      extendedPath._clickHandler = clickHandler;
    });
    return () => {
      paths.forEach(path => {
        const extendedPath = path as ExtendedSVGPathElement;
        if (extendedPath._clickHandler) {
          extendedPath.removeEventListener('click', extendedPath._clickHandler);
        }
      });
    };
  }, [svgContent, onEdgeSelect, type]);

  return (
    <div
      ref={containerRef}
      className='
        border border-gray-300
        rounded shadow-sm
        overflow-hidden bg-white
        w-[200px] h-[300px]
        md:w-[250px] md:h-[375px]
      '
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
