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

    /**
     * @TODO 아래 testResponse 데이터 삭제 (~79 line)
     */
    const testResponse = {
      year: 2025,
      emotions: ['기쁨', '행복함', '즐거움'],
      monthlyCounts: [
        {
          month: 1,
          count: 0,
        },
        {
          month: 2,
          count: 0,
        },
        {
          month: 3,
          count: 0,
        },
        {
          month: 4,
          count: 0,
        },
        {
          month: 5,
          count: 12,
        },
        {
          month: 6,
          count: 7,
        },
        {
          month: 7,
          count: 0,
        },
        {
          month: 8,
          count: 0,
        },
        {
          month: 9,
          count: 0,
        },
        {
          month: 10,
          count: 0,
        },
        {
          month: 11,
          count: 0,
        },
        {
          month: 12,
          count: 0,
        },
      ],
    };

    setHappinessStats(testResponse.monthlyCounts);
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
