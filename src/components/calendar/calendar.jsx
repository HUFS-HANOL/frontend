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

    /**
     * @TODO 서버 연결 시 주석 해제 및 아래 testdata 삭제
     */
    // getCalendarEmotion().then((res) => {
    //   if (res.status === 200) setMonthEmotion(res.data);
    // });

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

    setMonthEmotion(testData);

    const getEmotionStats = async () => {
      const param = {
        userId: userId,
        month: `${dayjs(date).format('YYYY-MM')}`,
      };

      return await fetchEmotionStats(param);
    };

    /**
     * @TODO 서버 연결 시 주석 해제 및 아래 testEmotion 데이터 삭제
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

    const handleEmotionClick = (date) => {
      const getDetailContent = async () => {
        const param = {
          userId: userId,
          date: `${dayjs(date).format('YYYY-MM-DD')}`,
        };

        return await fetchContentDetail(param);
      };

      /**
       * @TODO 서버 연결 시 주석 해제 및 아래 testContent 데이터 삭제
       */
      getDetailContent().then((res) => {
        if (res.status === 200) {
          openModal(res.data);
        }
      });

      const testContent = {
        date: '2025-05-31',
        diary: {
          title: '오늘의 일기 제목',
          content: '오늘은 기분이 좋았다.',
          created_at: '2025-05-31T10:00:00Z',
        },
        emotion: {
          type: '기쁨',
        },
        poem: {
          text: '햇살이 비추는 아침,\n마음이 따뜻해진다.',
          created_at: '2025-05-31T10:10:00Z',
        },
      };

      openModal(testContent);
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
      content: content,
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
      {modal.isOpen && <DiaryModal {...modal.content} onClose={closeModal} />}
    </div>
  );
}

export default Calendar;
