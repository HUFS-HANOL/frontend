import React from 'react';
import { Link } from 'react-router-dom';
import '../css/main.css';

function Main() {
  return (
    <div>
      {/* 네비게이션 바 */}
      <nav className="navbar">
        <ul>
          <li><Link className="active" to="/">메인</Link></li>
          <li><Link to="/calendar">달력</Link></li>
          <li><Link to="/today">오늘 일기</Link></li>
          <li><Link to="/stats">통계</Link></li>
          <li><Link to="/userpage">내 정보</Link></li>
        </ul>
      </nav>

      <div className="center-container">
        <h1 className="typing">오늘 기분 어때?</h1>
      </div>

      <div className="diary_btn">
        <ul>
          <li><a href="today.html">일기 쓰러 가기</a></li>
        </ul>
      </div>

      <div className="diary_message">
        <p>'한올'은 사용자의 마음을 어루만져 주기 위해 만들어진, 맞춤형 시 생성 일기 서비스입니다.</p>
      </div>
    </div>
  );
}

export default Main;
