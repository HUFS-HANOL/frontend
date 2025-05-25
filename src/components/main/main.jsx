import React from 'react';
import './main.css';
import Navbar from '../common/navbar/navbar';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/button/button';
import { useAuth } from '../../stores/authContext';

function Main() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const desc =
    "'한올'은 사용자의 마음을 어루만져 주기 위해 만들어진, 맞춤형 시 생성 일기 서비스입니다.";

  return (
    <div>
      <div>
        <Navbar />
        <div className='login-btn'>
          {isLoggedIn ? (
            <Button onClick={logout}>로그아웃</Button>
          ) : (
            <Button onClick={() => navigate('/login')}>로그인</Button>
          )}
        </div>
      </div>

      <div className='center-container'>
        <h1 className='typing'>오늘 기분 어때?</h1>
      </div>

      <div className='diary_btn'>
        <ul>
          <li>
            <Link to='/today'>일기 쓰기</Link>
          </li>
        </ul>
      </div>

      <div className='diary_message'>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default Main;
