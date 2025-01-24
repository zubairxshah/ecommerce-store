'use client'

import React from 'react';
import styled, { keyframes } from 'styled-components';

// Create spinning animation keyframes
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled component for the spinner
const SpinnerContainer = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
`;

const SpinnerCircle = styled.div`
  width: 100%;
  height: 100%;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 50 }) => {
  return (
    <SpinnerContainer style={{ width: size, height: size }}>
      <SpinnerCircle />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;