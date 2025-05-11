import { useForm } from 'react-hook-form';
import axios from 'axios';
import Navbar from '../common/navbar/navbar';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log('로그인 시도', data);
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      identifier: data.email,
      password: data.password,
    });

    if (response.status === 200) {
      const accessToken = response.data.accessToken;
      localStorage.setItem('accessToken', accessToken);

      // 로그인 성공시 메인 화면으로 이동
      navigate('/');
    } else {
      alert('로그인 실패');
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
          <h2 className='login-title'>로그인</h2>

          {/* 이메일 */}
          <div className='form-group'>
            <label htmlFor='email'>이메일</label>
            <input
              id='email'
              type='email'
              placeholder='example@hufs.com'
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '이메일 형식이 올바르지 않습니다.',
                },
              })}
              className={errors.email ? 'input error' : 'input'}
            />
            {errors.email && <p className='error-message'>{errors.email.message}</p>}
          </div>

          {/* 비밀번호 */}
          <div className='form-group'>
            <label htmlFor='password'>비밀번호</label>
            <input
              id='password'
              type='password'
              placeholder='비밀번호를 입력해주세요'
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
              className={errors.password ? 'input error' : 'input'}
            />
            {errors.password && <p className='error-message'>{errors.password.message}</p>}
          </div>

          <button type='submit' className='login-button' disabled={isSubmitting}>
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>

          <div className='signup-link-box'>
            <Link className='signup-link' to={'/signup'}>
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
