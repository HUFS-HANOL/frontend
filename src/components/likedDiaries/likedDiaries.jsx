import React, { useState, useEffect } from 'react';
import Navbar from '../common/navbar/navbar';
import './likedDiaries.css';
import axios from 'axios';

function LikedDiaries() {
  const [diaries, setDiaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log('LikedDiaries 컴포넌트 렌더링됨');
  console.log('현재 상태:', { diaries, isLoading });

  async function fetchLikedDiaries() {
    console.log('일기 목록 가져오기 시작');  
    try {
      const response = await axios.get('/api/liked-diaries');
      console.log('API 응답:', response.data); 
      setDiaries(response.data);
    } catch (error) {
      console.log('일기 목록 로딩 실패:', error);  
    }
    setIsLoading(false);
  }

  useEffect(() => {
    console.log('useEffect 실행됨'); 
    fetchLikedDiaries();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='diary-list'>
        {isLoading ? (
          <p>로딩중...</p>
        ) : diaries.length > 0 ? (
          diaries.map((diary) => {
            console.log('일기 렌더링:', diary);  
            return (
              <div key={diary.id} className="diary-item">
                {diary.content}
              </div>
            );
          })
        ) : (
          <p>찜한 일기가 없어요</p>
        )}
      </div>
    </div>
  );
}

export default LikedDiaries;
