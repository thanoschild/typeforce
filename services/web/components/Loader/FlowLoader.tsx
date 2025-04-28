import React from 'react';
import './FlowLoader.css';

export interface FlowLoaderProps {
  size?: number;
  color?: string;
  speed?: number;
  bgOpacity?: number;
  className?: string;
}

const FlowLoader: React.FC<FlowLoaderProps> = ({
  size = 45,
  color = '#000000',
  speed = 1.75,
  bgOpacity = 0.1,
  className = '',
}) => {
  const style = {
    '--uib-size': `${size}px`,
    '--uib-color': color,
    '--uib-speed': `${speed}s`,
    '--uib-bg-opacity': bgOpacity,
  } as React.CSSProperties;

  return (
    <div className={`flow-loader ${className}`} style={style}>
      <div className="flow-loader-half"></div>
      <div className="flow-loader-half"></div>
    </div>
  );
};

export default FlowLoader;