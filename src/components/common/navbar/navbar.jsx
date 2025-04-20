import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link className={location.pathname === '/' ? 'active' : ''} to='/'>
            메인
          </Link>
        </li>
        <li>
          <Link className={location.pathname === '/calendar' ? 'active' : ''} to='/calendar'>
            달력
          </Link>
        </li>
        <li>
          <Link className={location.pathname === '/today' ? 'active' : ''} to='/today'>
            오늘 일기
          </Link>
        </li>
        <li>
          <Link className={location.pathname === '/stats' ? 'active' : ''} to='/stats'>
            통계
          </Link>
        </li>
        <li>
          <Link className={location.pathname.includes('userpage') ? 'active' : ''} to='/userpage'>
            내 정보
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
