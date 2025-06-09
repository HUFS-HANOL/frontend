import './diaryModal.css';

const DiaryModal = ({ date, diary, poem, onClose }) => {
  return (
    <div className='modal show' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <button className='close-btn' onClick={onClose}>
            ×
          </button>
          <h3>📅 {date}의 기록</h3>
        </div>
        <section className='modal-split'>
          <div className='card left-card'>
            <h4>📓 그날의 일기</h4>
            {diary && <p className='content-text'>{diary.content}</p>}
          </div>
          <div className='card right-card'>
            <h4>✍️ 공감의 시</h4>
            {poem && (
              <div>
                <b className='content-text'>{poem.title}</b>
                <pre className='content-text'>{poem.text}</pre>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryModal;
