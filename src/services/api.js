// API 요청을 처리하는 함수들을 모아두었습니다! 

const BASE_URL = 'http://localhost:8000'; // 서버 주소에 맞게 수정하기

/**
 * 일기 데이터를 서버로 전송하고 AI가 생성한 시를 받아오는 함수
 * @param {string} diary - 사용자가 작성한 일기 내용
 * @returns {Promise<Object>} - 서버로부터 받은 응답 데이터
 */
export const generatePoem = async (diary) => {
  try {
    const response = await fetch(`${BASE_URL}/generate-poem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ diary }),
    });

    if (!response.ok) {
      throw new Error('서버 응답이 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('시 생성 중 오류 발생:', error);
    throw error;
  }
}; 