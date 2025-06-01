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
