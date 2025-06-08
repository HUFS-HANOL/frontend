import { useEffect, useState } from 'react';
import { fetchYearlyEmotionStatistics } from '../api';
import EmotionBarChart from '@/components/common/barChart/barChart';

const YearlyEmotion = () => {
  const [yearlyEmotion, setYearlyEmotion] = useState(undefined);

  useEffect(() => {
    const getYearlyEmotion = async () => {
      return await fetchYearlyEmotionStatistics();
    };

    getYearlyEmotion().then((res) => {
      if (res.status === 200) {
        const { emotions } = res.data;

        setYearlyEmotion(emotions);
      }
    });

    /**
     * @TODO 서버 연결 시 아래 testResponse 데이터 삭제, setYearlyEmotion(testResponse.emotions); 삭제
     */
    const testResponse = {
      emotions: [
        {
          name: '기쁨',
          count: 20,
        },
        {
          name: '슬픔',
          count: 10,
        },
        {
          name: '화남',
          count: 7,
        },
        {
          name: '신남',
          count: 7,
        },
        {
          name: '지침',
          count: 7,
        },
        {
          name: '보통',
          count: 7,
        },
      ],
    };

    setYearlyEmotion(testResponse.emotions);
  }, []);

  const chartData = yearlyEmotion?.map((item) => ({
    name: item.name,
    value: item.count,
  }));

  return (
    <div className='stats-section'>
      <div className='section-title'>올해 감정 요약</div>
      <EmotionBarChart chartData={chartData} />
    </div>
  );
};

export default YearlyEmotion;
