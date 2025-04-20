import Navbar from '../common/navbar/navbar';
import './likedDiaries.css';

const LikedDiaries = () => {
  return (
    <div>
      <Navbar />

      <div className='diary-list'>
        <div className='diary-card'>
          <h3>2025년 4월 12일</h3>
          <p>일기 내용</p>
        </div>
        <div className='diary-card'>
          <h3>2025년 3월 27일</h3>
          <p>일기 내용</p>
        </div>
      </div>
    </div>
  );
};

export default LikedDiaries;
