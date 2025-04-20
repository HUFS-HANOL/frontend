import './likedPoems.css';

import blushImg from '../../assets/images/blush.png';
import heartImg from '../../assets/images/heart.png';
import happyImg from '../../assets/images/happy.png';
import Navbar from '../common/navbar/navbar';

const LikedPoems = () => {
  return (
    <div>
      <Navbar />

      {/* 시 카드 그리드 */}
      <div className='grid-container'>
        {/* 예시 시 카드 1 */}
        <div className='poem-card'>
          <div className='poem-content'>
            <p>시 1</p>
            <p>2025년 4월 1일</p>
          </div>
          <div className='card-footer'>
            <img className='emotion' src={blushImg} data-emotion='happy' alt='기쁨' />
            <img className='heart' src={heartImg} alt='찜' />
          </div>
        </div>

        {/* 예시 시 카드 2 */}
        <div className='poem-card'>
          <div className='poem-content'>
            <p>시 2</p>
            <p>2025년 4월 3일</p>
          </div>
          <div className='card-footer'>
            <img className='emotion' src={blushImg} data-emotion='happy' alt='기쁨' />
            <img className='heart' src={heartImg} alt='찜' />
          </div>
        </div>

        {/* 예시 시 카드 3 */}
        <div className='poem-card'>
          <div className='poem-content'>
            <p>시 3</p>
            <p>2025년 4월 7일</p>
          </div>
          <div className='card-footer'>
            <img className='emotion' src={happyImg} data-emotion='excited' alt='신남' />
            <img className='heart' src={heartImg} alt='찜' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedPoems;
