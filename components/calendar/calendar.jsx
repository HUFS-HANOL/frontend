import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './calendar.css';

import penImg from '../../assets/images/pen.png';
import Navbar from '../common/navbar/navbar';
import { fetchCalendarEmotion, fetchEmotionStats } from './api';
import dayjs from 'dayjs';
import { getEmotionData } from '@/utils/hooks/getEmotionData';
import { useAuth } from '@/stores/authContext';
import EmotionPieChart from '../common/pieChart/pieChart';

function Calendar() {
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState({
    isOpen: false,
    type: '',
    text: '',
  });

  // 월별 감정 정보
  const [monthEmotion, setMonthEmotion] = useState([]);

  // 월별 감정 통계
  const [emotionStat, setEmotionStat] = useState(undefined);

  const { userId } = useAuth();

  useEffect(() => {
    const getCalendarEmotion = async () => {
      const param = {
        userId: userId,
        month: `${dayjs(date).format('YYYY-MM')}`,
      };

      return await fetchCalendarEmotion(param);
    };

    const testData = [
      {
        date: '2025-06-01',
        emotion: '기쁨',
        liked: true,
        hasPoem: true,
      },
      {
        date: '2025-06-03',
        emotion: '슬픔',
        liked: true,
        hasPoem: true,
      },
      {
        date: '2025-06-04',
        emotion: '화남',
        liked: true,
        hasPoem: true,
      },
    ];

    /**
     * @TODO 서버 연결 시 주석 해제
     */
    // getCalendarEmotion().then((res) => {
    //   if (res.status === 200) setMonthEmotion(res.data);
    // });

    setMonthEmotion(testData);

    const getEmotionStats = async () => {
      const param = {
        userId: userId,
        month: `${dayjs(date).format('YYYY-MM')}`,
      };

      return await fetchEmotionStats(param);
    };

    /**
     * @TODO 서버 연결 시 주석 해제
     */
    // getEmotionStats().then((res) => {
    //   if (res.status === 200) setEmotionStat(res.data);
    // });

    const testEmotion = {
      행복: 5,
      피곤함: 3,
      슬픔: 2,
    };

    setEmotionStat(testEmotion);
  }, [date, userId]);

  function goPrevMonth() {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    setDate(newDate);
  }

  function goNextMonth() {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    setDate(newDate);
  }

  function getDays() {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    const days = [];

    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    weekDays.forEach((day) =>
      days.push(
        <div key={`header-${day}`} className='day-header'>
          {day}
        </div>,
      ),
    );

    // 이전 달 날짜 채우기
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className='date-cell inactive'>
          {prevLastDate - i}
        </div>,
      );
    }

    // 현재 달 날짜 채우기
    for (let i = 1; i <= lastDate; i++) {
      const currentDate = dayjs(new Date(year, month, i)).format('YYYY-MM-DD');
      const dayEmotion = monthEmotion.find((item) => item.date === currentDate);

      days.push(
        <div key={`day-${i}`} className='date-cell'>
          <span className='date-number'>{i}</span>

          {dayEmotion?.emotion && (
            <span className='day-emotion' onClick={() => openModal('poem', '바보')}>
              {getEmotionData(dayEmotion.emotion)}
            </span>
          )}

          {!dayEmotion?.hasPoem && (
            <Link to='/today'>
              <img src={penImg} className='write-btn' alt='write' />
            </Link>
          )}
        </div>,
      );
    }

    return days;
  }

  function openModal(type, text) {
    setModal({
      isOpen: true,
      type: type,
      text: text,
    });
  }

  function closeModal() {
    setModal({
      isOpen: false,
      type: '',
      text: '',
    });
  }

  const currentYearMonth = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;

  return (
    <div>
      <Navbar />
      <div className='calendar-container'>
        <div className='calendar-header'>
          <button onClick={goPrevMonth}>&lt;</button>
          <div id='year-month'>{currentYearMonth}</div>
          <button onClick={goNextMonth}>&gt;</button>
        </div>
        <div className='calendar-grid'>{getDays()}</div>
        <div className='stats'>
          {/* <div className='pie-chart'></div> */}
          <div className='emotion-summary'>
            <p>{date.getMonth() + 1}월의 감정 통계</p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <EmotionPieChart data={emotionStat} />
          </div>
        </div>
      </div>
      {modal.isOpen && (
        <div className='modal show' onClick={closeModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <span className='close-btn' onClick={closeModal}>
              &times;
            </span>
            <h3>{modal.type === 'poem' ? '그날의 시' : '그날의 일기'}</h3>
            <p>{modal.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
