import React, { useEffect, useState } from 'react';
import Navbar from '../common/navbar/navbar';
import './favPoems.css';
import axios from 'axios';
import { useAuth } from '@/stores/authContext';

function FavPoems() {
  const [weather, setWeather] = useState(null);
  const [favPoems, setFavPoems] = useState([]);

  const { userId } = useAuth();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/weather');
        const items = res.data;

        const temperatureItem = items.find((item) => item.category === 'TMP');
        const skyItem = items.find((item) => item.category === 'SKY');

        const temp = temperatureItem ? temperatureItem.fcstValue : '??';
        let desc = '';

        if (skyItem) {
          switch (skyItem.fcstValue) {
            case '1':
              desc = '맑음';
              break;
            case '3':
              desc = '구름 많음';
              break;
            case '4':
              desc = '흐림';
              break;
            default:
              desc = '정보 없음';
          }
        }

        setWeather({ temp, desc });
      } catch (err) {
        console.error('날씨 정보를 불러오는 데 실패:', err);
      }
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    const fetchLikedPoems = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/likedPoems/view', {
          params: { user_id: userId },
        });
        console.log('좋아요한 시:', res.data.poems);
        setFavPoems(res.data.poems);
      } catch (err) {
        console.error('좋아요한 시 불러오기 실패:', err);
      }
    };

    fetchLikedPoems();
  }, []);

  return (
    <div className='favpoems-container'>
      <Navbar />
      <div className='weather-section glass-card'>
        <h2>오늘의 날씨</h2>
        {weather ? (
          <div className='weather-info'>
            <span className='weather-temp'>{weather.temp}°C</span>
            <span className='weather-desc'>{weather.desc}</span>
          </div>
        ) : (
          <div>날씨 정보를 불러오는 중...</div>
        )}
      </div>
      <div className='poems-section glass-card'>
        <h2>좋아하는 시 목록</h2>
        <ul>
          {favPoems.length > 0 ? (
            favPoems.map((poem, index) => (
              <li key={index} className='poem-item'>
                <pre>{poem.poem_text}</pre>
                <small>{new Date(poem.date).toLocaleDateString()}</small>
              </li>
            ))
          ) : (
            <li>좋아하는 시가 아직 없어요.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default FavPoems;
