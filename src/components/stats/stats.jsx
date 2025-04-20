import './stats.css';
import Navbar from '../common/navbar/navbar';

const Stats = () => {
  return (
    <div>
      <Navbar />

      <div className='stats-container'>
        {/* 1. 올해 감정 요약 */}
        <div className='stats-section'>
          <div className='section-title'>올해 감정 요약</div>
          <div className='bar-text-wrapper'>
            <div className='bar-chart'>
              <div className='bar joy'>기쁨</div>
              <div className='bar anger'>피곤함</div>
              <div className='bar tired'>슬픔</div>
              <div className='bar surprised'>놀람</div>
            </div>
            <div className='bar-description'>
              <p>
                올해는 전반적으로 기쁜 날이 많았지만,
                <br />
                피곤한 날들도 조금 많았어요.
              </p>
            </div>
          </div>
        </div>

        {/* 2. 이번 달 감정 요약 */}
        <div className='stats-section'>
          <div className='section-title'>이번 달 감정 요약</div>
          <div className='pie-text-wrapper'>
            <div className='pie-chart'>
              <span className='label label-joy'>기쁨</span>
              <span className='label label-anger'>분노</span>
              <span className='label label-tired'>피곤함</span>
              <span className='label label-surprised'>놀람</span>
              <span className='label label-excited'>신남</span>
            </div>
            <div className='emotion-summary'>
              <p>감정 분포</p>
              <p className='emotion-detail'>
                기쁨 - 55%
                <br />
                분노 - 11%
                <br />
                피곤함 - 11%
                <br />
                놀람 - 11%
                <br />
                신남 - 11%
              </p>
            </div>
          </div>
        </div>

        {/* 3. 올 한 해 행복도 */}
        <div className='stats-section'>
          <div className='section-title'>올 한 해 행복도</div>
          <div className='bar-text-wrapper'>
            <div className='bar-chart'>
              <div className='bar month1' style={{ height: '70%' }}>
                1월
              </div>
              <div className='bar month2' style={{ height: '65%' }}>
                2월
              </div>
              <div className='bar month3' style={{ height: '80%' }}>
                3월
              </div>
              <div className='bar month4' style={{ height: '55%' }}>
                4월
              </div>
              <div className='bar month5' style={{ height: '0%' }}></div>
              <div className='bar month6' style={{ height: '0%' }}></div>
              <div className='bar month7' style={{ height: '0%' }}></div>
              <div className='bar month8' style={{ height: '0%' }}></div>
              <div className='bar month9' style={{ height: '0%' }}></div>
              <div className='bar month10' style={{ height: '0%' }}></div>
              <div className='bar month11' style={{ height: '0%' }}></div>
              <div className='bar month12' style={{ height: '0%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
