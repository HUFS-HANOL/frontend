import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/navbar/navbar';
import './userPage.css';
import profileImg from '../../assets/images/profile_sample.png';

function UserPage() {
  const user = {
    name: 'hanol',
    birth: '2025/05/15',
    id: 'hanol123'
  };

  return (
    <div>
      <Navbar />
      <div className='mypage-container'>
        <div className='profile-section'>
          <img src={profileImg} alt='프로필' />
          <div className='info'>
            <p>
              <strong>유저명: {user.name}</strong>
            </p>
            <p>
              <strong>생일: {user.birth}</strong>
            </p>
            <p>
              <strong>아이디: {user.id}</strong>
            </p>
          </div>
        </div>

        <div className='favorites'>
          <li>
            <Link to='likedPoems'>찜한 시</Link>
          </li>
          <li>
            <Link to='likedDiaries'>찜한 일기</Link>
          </li>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
