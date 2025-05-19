import React, { useState } from 'react';
import './today.css';
import { saveDiaryDB, generatePoem } from '../../services/api';
import blushImg from '../../assets/images/blush.png';
import Navbar from '../common/navbar/navbar';
import Loading from '../common/loading/loading';

function Today() {
  const [diaryText, setDiaryText] = useState('');
  const [poemText, setPoemText] = useState('');
  const [phraseText, setPhraseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  console.log('Today 컴포넌트 렌더링됨');
  console.log('현재 상태:', { diaryText, poemText, phraseText, isLoading, error });
  
  async function convertToPoem() {
    console.log('시 변환 시작:', diaryText);  

    if (!diaryText) {
      setError('일기 내용을 입력해주세요');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const diaryResponse = await saveDiaryDB(diaryText);
      console.log('일기 저장 응답:', diaryResponse);
      const diaryId = diaryResponse.diaryId;

      if (diaryResponse.diaryMessage === "일기 저장 완료") {
        const result = await generatePoem(diaryText);
        console.log('API 응답:', result);  
        if (!result || !result.poem) {
          setError('시 생성 실패');
          return;
        }

      setPoemText(result.poem);
      setPhraseText(result.phrase || '');
    } else {
      setError('일기 저장 실패');
    } 
  } catch (err) {
      console.log('에러 발생:', err);  
      setError('오류가 발생했습니다');
      setPoemText('');
      setPhraseText('');
    }
    setIsLoading(false);
  }

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <div className="loading-overlay">
          <Loading />
        </div>
      ) : (
        <div className='container'>
          <div className='diary-container'>
            <h2>오늘의 일기</h2>
            <textarea
              className='diary-input'
              placeholder='일기 내용을 입력하세요'
              value={diaryText}
              onChange={(e) => {
                console.log('일기 입력:', e.target.value);  
                setDiaryText(e.target.value);
              }}
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <div className='poem-container'>
            <div className='poem-section'>
              <h2>생성된 시</h2>
              <textarea
                className='poem-output'
                placeholder='시가 여기에 표시됩니다'
                value={poemText}
                readOnly
              />
              <div className='emotion-icons'>
                <img className='emotion' src={blushImg} alt='기쁨' />
              </div>
            </div>

            <div className='phrase-section'>
              <h2>공감 문구</h2>
              <textarea
                className='phrase-output'
                value={phraseText}
                readOnly
              />
            </div>
          </div>

          <div className='convert-section'>
            <button 
              className='convert-btn' 
              onClick={convertToPoem}
              disabled={isLoading || !diaryText}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Today;
