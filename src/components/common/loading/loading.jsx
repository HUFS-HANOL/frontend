import React from 'react';
import './loading.css';

function Loading() {
  const loadingMessage = "당신을 위한 시를 만들고 있어요!";

  return (
    <div className="loading-container">
      <div className="loading-circle"></div>
      
      <p className="loading-text">{loadingMessage}</p>
      
      <div className="progress"></div>
    </div>
  );
}

export default Loading;
