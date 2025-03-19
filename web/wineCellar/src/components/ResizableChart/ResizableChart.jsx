import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ResponsiveContainer } from 'recharts';

export const ResizableChart = ({
  children,
  width = '100%',
  height = '300px',
  debounceTime = 150,
  className,
}) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const containerRef = useRef(null);

  const debouncedHandleResize = useCallback(
    (callback) => {
      return (...args) => {
        clearTimeout(timeoutId);
        const id = setTimeout(() => callback(...args), debounceTime);
        setTimeoutId(id);
      };
    },
    [debounceTime]
  );

  const handleResize = useCallback((entries) => {
    requestAnimationFrame(() => {
      const entry = entries[0];
      if (entry.contentRect) {
        // Update chart dimensions
        console.log(
          'Optimized resize:',
          entry.contentRect.width,
          entry.contentRect.height
        );
      }
    });
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(debouncedHandleResize(handleResize));

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [handleResize, debouncedHandleResize]);

  return (
    <div ref={containerRef} style={{ width, height }} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
};
