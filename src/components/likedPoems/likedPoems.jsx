import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './likedPoems.css';
import Navbar from '../common/navbar/navbar';

function LikedPoems() {
  const [poems, setPoems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log('LikedPoems 컴포넌트 렌더링됨');
  console.log('현재 상태:', { poems, isLoading });

  async function fetchLikedPoems() {
    console.log('시 목록 가져오기 시작'); 
    try {
      const response = await axios.get('/api/liked-poems');
      console.log('API 응답:', response.data); 
      setPoems(response.data);
    } catch (error) {
      console.log('시 목록 로딩 실패:', error); 
    }
    setIsLoading(false);
  }

  useEffect(() => {
    console.log('useEffect 실행됨');  
    fetchLikedPoems();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='grid-container'>
        {isLoading ? (
          <p>로딩중...</p>
        ) : poems.length > 0 ? (
          poems.map((poem) => {
            console.log('시 렌더링:', poem);  
            return (
              <div key={poem.id} className="poem-card">
                <h3>{poem.title}</h3>
                <p>{poem.content}</p>
              </div>
            );
          })
        ) : (
          <p>찜한 시가 없어요</p>
        )}
      </div>
    </div>
  );
}

export default LikedPoems;
