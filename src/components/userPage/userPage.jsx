import { Link } from 'react-router-dom';
import Navbar from '../common/navbar/navbar';
import './userPage.css';

import profileImg from '../../assets/images/profile_sample.png';

function UserPage() {
  return (
    <div>
      <Navbar />

      <div className='mypage-container'>
        <div className='profile-section'>
          <img src={profileImg} alt='프로필사진' />
          <div className='info'>
            <p>
              <strong>유저명:</strong> 한올
            </p>
            <p>
              <strong>생일:</strong> 2025.04.17
            </p>
            <p>
              <strong>아이디:</strong> hanol01
            </p>
          </div>
        </div>

        <div className='favorites'>
          <li>
            <Link to='likedPoems'>찜한 시 보러가기</Link>
          </li>
          <li>
            <Link to='likedDiaries'>찜한 일기 보러가기</Link>
          </li>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
