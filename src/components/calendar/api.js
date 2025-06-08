import { instance } from '@/utils/apiConfig';

export const fetchCalendarEmotion = async (params) => {
  const response = await instance.get('/api/calendar/emotion', { params });

  return response;
};

/**
 * 감정 통계 API
 */
export const fetchEmotionStats = async (params) => {
  const response = await instance.get('/api/calendar/emotions/stats', { params });

  return response;
};

/**
 * 특정 날짜 일기/시 상세 조회 API
 */
export const fetchContentDetail = async (params) => {
  console.log(params);
  const response = await instance.get('/api/calendar/detail', { params });

  return response;
};
