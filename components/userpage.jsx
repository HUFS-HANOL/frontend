import React from 'react';
import { Link } from 'react-router-dom';
import '../css/userpage.css';

import profileImg from './images/profile_sample.png';

function UserPage() {
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

      <div className="mypage-container">
        <div className="profile-section">
          <img src={profileImg} alt="프로필사진" />
          <div className="info">
            <p><strong>유저명:</strong> 한올</p>
            <p><strong>생일:</strong> 2025.04.17</p>
            <p><strong>아이디:</strong> hanol01</p>
          </div>
        </div>

        <div className="favorites">
          <li><Link to="/likedPoems">찜한 시 보러가기</Link></li>
          <li><Link to="/likedDiaries">찜한 일기 보러가기</Link></li>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
