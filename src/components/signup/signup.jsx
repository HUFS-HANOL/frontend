import axios from 'axios';
import { useForm } from 'react-hook-form';
import Navbar from '../common/navbar/navbar';
import './signup.css';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    console.log('회원가입 데이터', data);
    const response = await axios.post('http://localhost:3000/api/auth/register', {
      username: data.username,
      email: data.email,
      password: data.password,
    });

    console.log(response);

    // 회원가입 성공 시 로그인 페이지로 이동
    if (response.status === 200) {
      navigate('/login');
    } else {
      alert('회원가입 실패');
    }

    console.log(response);
  };

  const password = watch('password');

  return (
    <div>
      <Navbar />

      <form onSubmit={handleSubmit(onSubmit)} className='signup-form'>
        <h2 className='title'>회원가입</h2>
        <p className='subtitle'>나의 ~~~, 한올</p>

        {/* 이름 */}
        <div className='form-group'>
          <label htmlFor='username'>이름</label>
          <input
            id='username'
            type='username'
            placeholder='김외대'
            {...register('username', {
              required: '이름을 입력해주세요.',
            })}
            className={errors.username ? 'input error' : 'input'}
          />
          {errors.username && <p className='error-message'>{errors.username.message}</p>}
        </div>

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
            placeholder='********'
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: { value: 8, message: '8자 이상 입력해주세요.' },
              maxLength: { value: 32, message: '32자 이하로 입력해주세요.' },
              validate: {
                hasTwoTypes: (v) =>
                  [/[A-Za-z]/, /[0-9]/, /[!@#$%^&*]/].filter((r) => r.test(v)).length >= 2 ||
                  '영문/숫자/특수문자 중 2가지 이상 포함해야 합니다.',
                noRepeats: (v) =>
                  !/(.)\1\1/.test(v) || '연속 3자 이상의 동일한 문자/숫자는 사용할 수 없습니다.',
              },
            })}
            className={errors.password ? 'input error' : 'input'}
          />
          {errors.password && <p className='error-message'>{errors.password.message}</p>}
        </div>

        {/* 비밀번호 확인 */}
        <div className='form-group'>
          <label htmlFor='confirmPassword'>비밀번호 확인</label>
          <input
            id='confirmPassword'
            type='password'
            placeholder='********'
            {...register('confirmPassword', {
              required: '비밀번호 확인을 입력해주세요.',
              validate: (v) => v === password || '비밀번호가 일치하지 않습니다.',
            })}
            className={errors.confirmPassword ? 'input error' : 'input'}
          />
          {errors.confirmPassword && (
            <p className='error-message'>{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* 가입 버튼 */}
        <button type='submit' className='submit-btn'>
          가입하기
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
