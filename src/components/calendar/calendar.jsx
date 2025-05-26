import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './calendar.css';
import { calendar } from '../../data/dashboardDummyData';

import penImg from '../../assets/images/pen.png';
import Navbar from '../common/navbar/navbar';

function Calendar() {
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState({
    isOpen: false,
    type: '',
    text: ''
  });

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

    let days = [];

    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    weekDays.forEach(day => {
      days.push(
        <div key={`header-${day}`} className='day-header'>
          {day}
        </div>
    );
    });

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className='date-cell inactive'>
          {prevLastDate - i}
        </div>
      );
    }

    for (let i = 1; i <= lastDate; i++) {
      const dateStr = `${year}-${month + 1}-${i}`;
      days.push(
        <div key={`day-${i}`} className='date-cell'>
          <span className='date-number'>{i}</span>
          <Link to="/today">
              <img src={penImg} className='write-btn' alt='write' />
            </Link>
        </div>
      );
    }

    return days;
  }

  function openModal(type, text) {
    setModal({
      isOpen: true,
      type: type,
      text: text
    });
  }

  function closeModal() {
    setModal({
      isOpen: false,
      type: '',
      text: ''
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
          <div className='pie-chart'></div>
          <div className='emotion-summary'>
            <p>이번 달의 감정 통계</p>
          </div>
        </div>
      </div>
      {modal.isOpen && (
        <div className='modal show' onClick={closeModal}>
          <div className='modal-content' onClick={e => e.stopPropagation()}>
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
