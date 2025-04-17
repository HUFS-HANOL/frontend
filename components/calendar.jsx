import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../css/calendar.css';

import blushImg from './images/blush.png';
import sadImg from './images/sad.png';
import yawnImg from './images/yawn.png';
import surpriseImg from './images/surprise.png';
import happyImg from './images/happy.png';
import heartImg from './images/heart_7915410.png';
import penImg from './images/pen_16625099.png';
import starImg from './images/star.png';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalContent, setModalContent] = useState({ type: '', text: '' });
  const [modalOpen, setModalOpen] = useState(false);

  const emotions = {
    1: blushImg,
    2: blushImg,
    3: blushImg,
    4: sadImg,
    5: yawnImg,
    6: blushImg,
    7: surpriseImg,
    8: happyImg,
    9: blushImg
  };

  const hearts = {
    1: heartImg,
    3: heartImg,
    7: heartImg
  };

  const samplePoems = {
    1: '이것은 소리없는 아우성',
    3: '저 푸른 해원을 향하여 흔드는',
    7: '영원한 노스탤지어의 손수건'
  };

  const sampleDiaries = {
    1: '일기 내용',
    2: '일기 내용',
    3: '일기 내용',
    4: '일기 내용',
    5: '일기 내용',
    6: '일기 내용',
    7: '일기 내용',
    8: '일기 내용',
    9: '일기 내용'
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const days = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    const result = [];

    // 요일 헤더
    ['일', '월', '화', '수', '목', '금', '토'].forEach(day =>
      result.push(<div key={`header-${day}`} className="day-header">{day}</div>)
    );

    // 지난 달
    for (let i = firstDay - 1; i >= 0; i--) {
      result.push(<div key={`prev-${i}`} className="date-cell inactive">{prevLastDate - i}</div>);
    }

    // 이번 달
    for (let i = 1; i <= lastDate; i++) {
      const emotion = emotions[i];
      const heart = hearts[i];
      const poem = samplePoems[i];
      const diary = sampleDiaries[i];
      const dateStr = `${year}-${month + 1}-${i}`;

      result.push(
        <div key={`day-${i}`} className="date-cell">
          <span className="date-number">{i}</span>

          {emotion && (
            <img
              src={emotion}
              className="emotion-icons"
              data-day={i}
              onClick={() => handleOpenModal('diary', diary || '일기 내용')}
              alt="emotion"
            />
          )}

          {emotion && (
            <img
              src={starImg}
              className="poem-icon"
              data-day={i}
              onClick={() => handleOpenModal('poem', poem || '시 내용')}
              alt="poem"
            />
          )}

          {heart && <img src={heart} className="heart-icon" alt="heart" />}

          {!emotion && (
            <Link to={`/write-diary?date=${dateStr}`}>
              <img src={penImg} className="write-btn" alt="write" />
            </Link>
          )}
        </div>
      );
    }

    return result;
  }, [currentDate]);

  const yearMonthText = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

  // 모달 열기
  const handleOpenModal = (contentType, contentText) => {
    setModalContent({ type: contentType, text: contentText });
    setModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><Link className="active" to="/">메인</Link></li>
          <li><Link to="/calendar">달력</Link></li>
          <li><Link to="/today">오늘 일기</Link></li>
          <li><Link to="/stats">통계</Link></li>
          <li><Link to="/userpage">내 정보</Link></li>
        </ul>
      </nav>

      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={prevMonth}>&lt;</button>
          <div id="year-month">{yearMonthText}</div>
          <button onClick={nextMonth}>&gt;</button>
        </div>

        <div className="calendar-grid">{days}</div>

        <div className="stats">
          <div className="pie-chart"></div>
          <div className="emotion-summary">
            <p>이번 달은 기쁜 날이 많았어요!</p>
            <p>
              <span className="emotion-detail">
                기쁨 - 55% / 분노 - 11% / 피곤함 - 11% / 놀람 - 11% / 신남 - 11%
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* 모달 창 */}
      {modalOpen && (
        <div className={`modal ${modalOpen ? 'show' : ''}`} onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close-btn" onClick={handleCloseModal}>&times;</span>
            <h3>{modalContent.type === 'poem' ? '그날의 시' : '그날의 일기'}</h3>
            <p>{modalContent.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
