// API 요청을 처리하는 함수들을 모아두었습니다! 

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/today'; // 서버 주소에 맞게 수정하기

/**
 * 일기 데이터를 서버로 전송하고 AI가 생성한 시를 받아오는 함수
 * @param {string} diary - 사용자가 작성한 일기 내용
 * @returns {Promise<Object>} - 서버로부터 받은 응답 데이터
 */
export const generatePoem = async (diary) => {
  try {
    const response = await axios.post(`${BASE_URL}/poemphasre`, { diary }, {
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
