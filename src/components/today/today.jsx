import React, { useState } from 'react';
import './today.css';
import { saveDiaryDB, generatePoem, savePoem, likePoem } from '../../services/api'; 
import Navbar from '../common/navbar/navbar';
import Loading from '../common/loading/loading';
import { getEmotionData, mappingEmotion } from '@/utils/hooks/getEmotionData';

function Today() {
  const [diaryText, setDiaryText] = useState('');
  const [poemText, setPoemText] = useState('');
  const [phraseText, setPhraseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [openEmotionBox, setOpenEmotionBox] = useState(false);
  const [todayEmotion, setTodayEmotion] = useState(undefined);
  
  const [liked, setLiked] = useState(false); 
  const [lastPoemId, setLastPoemId] = useState(null); 
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
    setLiked(false); 
    try {
      const diaryResponse = await saveDiaryDB(diaryText, todayEmotion);
      console.log('일기 저장 응답:', diaryResponse);
      const diaryId = diaryResponse.diary_id;

      if (diaryResponse.diaryMessage === "일기 저장 완료") {
        const result = await generatePoem(diaryText, diaryId, todayEmotion);
        console.log('API 응답:', result);  
        if (!result || !result.poem) {
          setError('시 생성 실패');
          return;
        }

        setPoemText(result.poem);
        setPhraseText(result.phrase || '');

        const userId = localStorage.getItem("user_id"); 
        const poemSaveResponse = await savePoem(userId, diaryId, result.poem, result.emotion_id); 
        console.log('시 저장 응답:', poemSaveResponse);
        
        // 시 저장이 성공하면 poem_id 저장
        if (poemSaveResponse.poem_id) {
          setLastPoemId(poemSaveResponse.poem_id);
        }

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

  async function handleLikeClick() {
    if (!lastPoemId) {
      console.error('poem_id가 없어 좋아요 요청 불가');
      return;
    }

    try {
      await likePoem(lastPoemId, !liked);
      setLiked(!liked); 
      console.log('좋아요 상태 변경됨:', !liked);
    } catch (err) {
      console.error('좋아요 요청 중 오류:', err);
    }
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

            <div className='emotion-select-box'>오늘의 감정을 선택해주세요!</div>

            <div className='emotion-icons' onClick={() => setOpenEmotionBox((prev) => !prev)}>
              <div className='emotion'>{getEmotionData(todayEmotion)}</div>
              <div className={`emotion-box ${openEmotionBox ? 'slide-in' : 'slide-out'}`}>
                {Object.keys(mappingEmotion).map((emotion) => (
                  <div 
                    key={emotion} 
                    onClick={() => setTodayEmotion(emotion)} 
                    className='emotion-item'
                  >
                    {getEmotionData(emotion)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='convert-section'>
            <button 
              className='convert-btn' 
              onClick={convertToPoem}
              disabled={isLoading || !diaryText}
            />
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
              {poemText && (
                <button 
                  onClick={handleLikeClick} 
                  className={`like-poem-button ${liked ? 'liked' : ''}`}
                >
                  {liked ? '♥︎ 좋아요 취소' : '♥︎ 시 좋아요'}
                </button>
              )}
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
        </div>
      )}
    </div>
  );
}

export default Today;
