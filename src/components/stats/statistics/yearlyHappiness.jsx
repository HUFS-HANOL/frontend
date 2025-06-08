import { useEffect, useState } from 'react';
import { fetchYearlyHappiness } from '../api';
import EmotionBarChart from '@/components/common/barChart/barChart';

const YearlyHappiess = () => {
  const [happinessStats, setHappinessStats] = useState(undefined);

  useEffect(() => {
    const getYearlyHappiness = async () => {
      return await fetchYearlyHappiness();
    };

    getYearlyHappiness().then((res) => {
      if (res.status === 200) {
        const { monthlyCounts } = res.data;

        setHappinessStats(monthlyCounts);
      }
    });
  }, []);

  const chartData = happinessStats?.map((item) => ({
    name: `${item.month}월`,
    value: item.count,
  }));

  return (
    <>
      <div className='stats-section'>
        <div className='section-title'>올 한 해 행복도</div>
        <EmotionBarChart chartData={chartData} />
      </div>
    </>
  );
};

export default YearlyHappiess;
