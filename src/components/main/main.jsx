import React from 'react';
import './main.css';
import Navbar from '../common/navbar/navbar';
import { Link } from 'react-router-dom';

function Main() {
  const desc = "'한올'은 사용자의 마음을 어루만져 주기 위해 만들어진, 맞춤형 시 생성 일기 서비스입니다.";

  return (
    <div>
      <Navbar />
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
