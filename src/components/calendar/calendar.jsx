import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './calendar.css';

import penImg from '../../assets/images/pen.png';
import Navbar from '../common/navbar/navbar';
import { fetchCalendarEmotion, fetchEmotionStats, fetchContentDetail } from './api';
import dayjs from 'dayjs';
import { getEmotionData } from '@/utils/hooks/getEmotionData';
import { useAuth } from '@/stores/authContext';
import EmotionPieChart from '../common/pieChart/pieChart';
import DiaryModal from './modal/diaryModal';

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

    getCalendarEmotion().then((res) => {
      if (res.status === 200) setMonthEmotion(res.data);
    });

    const getEmotionStats = async () => {
      const param = {
        userId: userId,
        month: `${dayjs(date).format('YYYY-MM')}`,
      };

      return await fetchEmotionStats(param);
    };

    getEmotionStats().then((res) => {
      if (res.status === 200) setEmotionStat(res.data);
    });
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

    const handleEmotionClick = (date) => {
      const getDetailContent = async () => {
        const param = {
          userId: userId,
          date: `${dayjs(date).format('YYYY-MM-DD')}`,
        };

        return await fetchContentDetail(param);
      };

      getDetailContent().then((res) => {
        if (res.status === 200) {
          openModal(res.data);
        }
      });
    };

    // 현재 달 날짜 채우기
    for (let i = 1; i <= lastDate; i++) {
      const currentDate = dayjs(new Date(year, month, i)).format('YYYY-MM-DD');
      const dayEmotion = monthEmotion.find((item) => item.date === currentDate);

      days.push(
        <div key={`day-${i}`} className='date-cell'>
          <span className='date-number'>{i}</span>

          {dayEmotion?.emotion && (
            <span className='day-emotion' onClick={() => handleEmotionClick(currentDate)}>
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

  function openModal(content) {
    setModal({
      isOpen: true,
      content: content.entries[0],
      date: content.date,
    });
  }

  function closeModal() {
    setModal({
      isOpen: false,
      content: '',
      date: '',
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
      {modal.isOpen && <DiaryModal {...modal.content} date={modal.date} onClose={closeModal} />}
    </div>
  );
}

export default Calendar;
