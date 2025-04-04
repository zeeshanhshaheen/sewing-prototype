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

interface ExtendedSVGElement extends SVGElement {
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
    const svgElement = container.querySelector('svg');
    if (!svgElement) return;

    // Force the SVG to fill its container while maintaining aspect ratio
    svgElement.setAttribute('width', '100%');
    svgElement.setAttribute('height', '100%');
    svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    (svgElement as SVGElement).style.display = 'block';

    // Find all <path> and <polygon> elements
    const elements = svgElement.querySelectorAll('path, polygon');
    console.log('Found clickable elements:', elements.length);
    elements.forEach(el => {
      (el as SVGElement).style.cursor = 'pointer';
      const clickHandler = (e: Event) => {
        e.stopPropagation();
        (el as SVGElement).classList.toggle('selected-edge');
        let data = el.getAttribute('d');
        if (!data && el.tagName.toLowerCase() === 'polygon') {
          data = el.getAttribute('points');
        }
        onEdgeSelect({ d: data, type });
      };
      el.addEventListener('click', clickHandler);
      const extendedEl = el as ExtendedSVGElement;
      extendedEl._clickHandler = clickHandler;
    });
    return () => {
      elements.forEach(el => {
        const extendedEl = el as ExtendedSVGElement;
        if (extendedEl._clickHandler) {
          el.removeEventListener('click', extendedEl._clickHandler);
        }
      });
    };
  }, [svgContent, onEdgeSelect, type]);

  return (
    <div
      ref={containerRef}
      className='relative w-full h-[275px] md:h-[325px] border border-gray-300 rounded shadow-sm bg-white overflow-hidden'
      dangerouslySetInnerHTML={{ __html: svgContent }}
    ></div>
  );
}
