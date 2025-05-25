// API 요청을 처리하는 함수들을 모아두었습니다!

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/today';

export const saveDiaryDB = async (diary) => {
  console.log('saveDiaryDB 호출');
  try {
    const response = await axios.post(
      `${BASE_URL}/diaries`,
      {
        user_id: 1,
        content: diary,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
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
    console.log('generatePoem 호출');
    const response = await axios.post(
      `${BASE_URL}/poemphrase`,
      { content, diary_id },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('시 생성 중 오류 발생:', error);
    throw error;
  }
};
