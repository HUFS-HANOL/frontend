import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './stats.css';
import Navbar from '../common/navbar/navbar';
import { stats } from '../../data/dashboardDummyData';

function Stats() {
  const [yearlyStats, setYearlyStats] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState(null);
  const [happinessStats, setHappinessStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log('Stats 컴포넌트 렌더링됨');
  console.log('현재 상태:', { yearlyStats, monthlyStats, happinessStats, isLoading });

  async function fetchStats() {
    console.log('통계 데이터 가져오기 시작');  
    try {
      const response = await axios.get('/api/stats');
      console.log('API 응답:', response.data);  
      setYearlyStats(response.data.yearlyStats);
      setMonthlyStats(response.data.monthlyStats);
      setHappinessStats(response.data.happinessStats);
    } catch (error) {
      console.log('통계 로딩 실패:', error);  
    }
    setIsLoading(false);
  }

  useEffect(() => {
    console.log('useEffect 실행됨');  
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="loading">로딩중...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className='stats-container'>
        <div className='stats-section'>
          <div className='section-title'>올해 감정 요약</div>
          <div className='bar-text-wrapper'>
            <div className='bar-chart'>
              <div className='bar joy'>기쁨</div>
              <div className='bar anger'>피곤함</div>
              <div className='bar tired'>슬픔</div>
              <div className='bar surprised'>놀람</div>
            </div>
            <div className='bar-description'>
              <p>올해 통계</p>
            </div>
          </div>
        </div>

        <div className='stats-section'>
          <div className='section-title'>이번 달 감정 요약</div>
          <div className='pie-text-wrapper'>
            <div className='pie-chart'>
              <span className='label label-joy'>기쁨</span>
              <span className='label label-anger'>분노</span>
              <span className='label label-tired'>피곤함</span>
              <span className='label label-surprised'>놀람</span>
              <span className='label label-excited'>신남</span>
            </div>
          </div>
        </div>

        <div className='stats-section'>
          <div className='section-title'>올 한 해 행복도</div>
          <div className='bar-text-wrapper'>
            <div className='bar-chart'>
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(month => {
                console.log('월별 행복도 렌더링:', month);  
                return (
                  <div 
                    key={month} 
                    className={`bar month${month}`}
                    style={{ height: `${60 + (month * 2.5)}%` }}
                  >
                    {month}월
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
