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
