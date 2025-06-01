// API 요청을 처리하는 함수들을 모아두었습니다! 

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/today'; 

export const saveDiaryDB = async (diary) => {
      const token = localStorage.getItem("accessToken"); 
      // const userId = localStorage.getItem("user_id");
      const userId = 1;
      console.log('saveDiaryDB 호출, accessToken:', token);
  try {
    const response = await axios.post(`${BASE_URL}/diaries`, {
      content: diary,
      user_id: userId, }, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json',
      },
    });
    console.log('일기 DB 연결 성공:', response.status); 
    console.log('응답 데이터:', response.data); 
    return response.data; 

  } catch (error) {
    console.error('일기 저장 중 오류 발생:', error);
    throw error;
  }
};

export const generatePoem = async (content, diary_id) => {
  try {
    console.log('generatePoem 호출, diary_id:', diary_id);
    const response = await axios.post(`${BASE_URL}/poemphrase`, { content, diary_id }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('시 생성 중 오류 발생:', error);
    throw error;
  }
};

export const savePoem = async (user_id, diary_id, poem, emotion_id) => {
  try {
    console.log('savePoem 호출, user_id:', user_id, 'diary_id:', diary_id, 'poem:', poem);
    const response = await axios.post(`${BASE_URL}/poems`, {
      user_id,
      diary_id,
      poem: poem, 
      emotion_id: emotion_id
    });
    return response.data;
  } catch (error) {
    console.error("시 저장 실패:", error);
    throw error;
  }
};

export const getLikedPoems = async (user_id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/likedPoems/view`, {
      params: { user_id },
    });
    return response.data.poems; 
  } catch (error) {
    console.error("좋아요한 시 불러오기 실패:", error);
    throw error;
  }
};
