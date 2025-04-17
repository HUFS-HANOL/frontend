import React from 'react';
import '../css/loading.css';

function Loading() {
  return (
    <div>
      <div className="loading-circle"></div>
      <p>당신을 위한 시를 만들고 있어요!</p>
      <div className="progress"></div>
      {/* 로딩 완료 후에는 JavaScript로 다음 페이지로 이동하도록 구현 예정*/}
    </div>
  );
}

export default Loading;
