
import React from 'react';
import ReactLoading from 'react-loading';

interface LoadingProps {
  type: 'blank' | 'balls' | 'bars' | 'bubbles' | 'cubes' | 'cylon' | 'spin' | 'spinningBubbles' | 'spokes';
  color?: string;
  height?: string | number;
  width?: string | number;
}

const Loading: React.FC<LoadingProps> = ({
  type = 'spin',
  color = '#007BFF',
  height = 64,
  width = 64,
}) => {
  return (
    <div className="loading-container">
      <ReactLoading type={type} color={color} height={height} width={width} />
    </div>
  );
};

export default Loading;
