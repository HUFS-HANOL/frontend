import React from 'react';
import '../css/likedDiaries.css';

function LikedDiaries() {
  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><a href="main.html">메인</a></li>
          <li><a href="calendar.html">달력</a></li>
          <li><a href="today.html">오늘 일기</a></li>
          <li><a href="stats.html">통계</a></li>
          <li><a href="userpage.html">내 정보</a></li>
        </ul>
      </nav>

      <div className="diary-list">
        <div className="diary-card">
          <h3>2025년 4월 12일</h3>
          <p>일기 내용</p>
        </div>
        <div className="diary-card">
          <h3>2025년 3월 27일</h3>
          <p>일기 내용</p>
        </div>
      </div>
    </div>
  );
}

export default LikedDiaries;
