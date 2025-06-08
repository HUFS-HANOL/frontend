import { useEffect, useState } from 'react';
import { fetchMonthlyEmotionStatistics } from '../api';
import EmotionPieChart from '@/components/common/pieChart/pieChart';

const MonthlyEmotion = () => {
  const [emotionStat, setEmotionStat] = useState(undefined);
  useEffect(() => {
    const getMontlyEmotion = async () => {
      return await fetchMonthlyEmotionStatistics();
    };

    getMontlyEmotion().then((res) => {
      if (res.status === 200) {
        const { emotions } = res.data;
        const emotionCounts = emotions.reduce((acc, emotion) => {
          acc[emotion.name] = emotion.count;
          return acc;
        }, {});

        setEmotionStat(emotionCounts);
      }
    });
  }, []);

  return (
    <div className='stats-section'>
      <div className='section-title'>이번 달 감정 요약</div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className='pie-text-wrapper'
      >
        <EmotionPieChart data={emotionStat} />
      </div>
    </div>
  );
};

export default MonthlyEmotion;
