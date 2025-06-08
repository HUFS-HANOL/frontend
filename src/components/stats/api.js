import { instance } from '@/utils/apiConfig';

/**
 * 해당 월에 사용된 감정들의 통계(개수 및 비율)를 제공하는 api
 */
export const fetchMonthlyEmotionStatistics = async () => {
  const response = await instance.get('/api/statistics/monthly');

  return response;
};

/**
 * 올 한해 행복도 나타내는 api
 */
export const fetchYearlyHappiness = async () => {
  const response = await instance.get('/api/statistics/yearly-happiness');

  return response;
};

/**
 * 올 한해 감정 요약 api
 */
export const fetchYearlyEmotionStatistics = async () => {
  const response = await instance.get('/api/statistics/count');

  return response;
};
