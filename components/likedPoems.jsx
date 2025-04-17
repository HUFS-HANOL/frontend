import React from 'react';
import { Link } from 'react-router-dom';
import '../css/likedPoems.css';

import blushImg from './images/blush.png';
import heartImg from './images/heart_7915410.png';
import happyImg from './images/happy.png';

function LikedPoems() {
  return (
    <div>
      {/* 네비게이션 바 */}
      <nav className="navbar">
        <ul>
          <li><Link to="/">메인</Link></li>
          <li><Link to="/calendar">달력</Link></li>
          <li><Link to="/today">오늘 일기</Link></li>
          <li><Link to="/stats">통계</Link></li>
          <li><Link to="/userpage">내 정보</Link></li>
        </ul>
      </nav>

      {/* 시 카드 그리드 */}
      <div className="grid-container">
        {/* 예시 시 카드 1 */}
        <div className="poem-card">
          <div className="poem-content">
            <p>시 1</p>
            <p>2025년 4월 1일</p>
          </div>
          <div className="card-footer">
            <img className="emotion" src={blushImg} data-emotion="happy" alt="기쁨" />
            <img className="heart" src={heartImg} alt="찜" />
          </div>
        </div>

        {/* 예시 시 카드 2 */}
        <div className="poem-card">
          <div className="poem-content">
            <p>시 2</p>
            <p>2025년 4월 3일</p>
          </div>
          <div className="card-footer">
            <img className="emotion" src={blushImg} data-emotion="happy" alt="기쁨" />
            <img className="heart" src={heartImg} alt="찜" />
          </div>
        </div>

        {/* 예시 시 카드 3 */}
        <div className="poem-card">
          <div className="poem-content">
            <p>시 3</p>
            <p>2025년 4월 7일</p>
          </div>
          <div className="card-footer">
            <img className="emotion" src={happyImg} data-emotion="excited" alt="신남" />
            <img className="heart" src={heartImg} alt="찜" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LikedPoems;
