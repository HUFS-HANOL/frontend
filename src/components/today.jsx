import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../css/today.css";

import blushImg from './images/blush.png';

const Today = () => {
  const [diaryText, setDiaryText] = useState("");
  const [poemText, setPoemText] = useState("");
  const [phraseText, setPhraseText] = useState("");

  const handleConvert = () => {
    if (diaryText.trim() === "") {
      setPoemText("일기를 먼저 입력해주세요!");
      setPhraseText("");
      return;
    }

    const poem = diaryText.split(".").join(".\n");
    setPoemText(poem);
    setPhraseText("남은 하루도 잘 마무리하길 바라요 :)");
  };

  return (
    <>
      {/* 네비게이션 바 */}
      <nav className="navbar">
        <ul>
          <li><Link className="active" to="/">메인</Link></li>
          <li><Link to="/calendar">달력</Link></li>
          <li><Link to="/today">오늘 일기</Link></li>
          <li><Link to="/stats">통계</Link></li>
          <li><Link to="/userpage">내 정보</Link></li>
        </ul>
      </nav>

      {/* 메인 컨테이너 */}
      <div className="container">
        <div className="diary-section">
          <h2>오늘의 일기</h2>
          <textarea
            className="diary-input"
            placeholder="오늘의 감정을 적어 보세요!"
            value={diaryText}
            onChange={(e) => setDiaryText(e.target.value)}
          />
        </div>

        {/* 시 변환 버튼 */}
        <div className="convert-section">
          <button className="convert-btn" onClick={handleConvert}>
            시로 바꾸기
          </button>
        </div>

        <div className="poem-container">
          <div className="poem-section">
            <h2>생성된 시</h2>
            <textarea
              className="poem-output"
              placeholder="당신을 위한 시를 읽어 보세요!"
              value={poemText}
              readOnly
            />
            <div className="emotion-icons">
              <img className="emotion" src={blushImg} alt="기쁨" />
            </div>
          </div>

          <div className="phrase-section">
            <h2>공감 문구</h2>
            <textarea
              className="phrase-output"
              placeholder="남은 하루도 잘 마무리하길 바라요 :)"
              value={phraseText}
              readOnly
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Today;
