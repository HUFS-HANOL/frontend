import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { path: '/', label: '메인' },
    { path: '/calendar', label: '달력' },
    { path: '/today', label: '오늘 일기' },
    { path: '/stats', label: '통계' },
    { path: '/userpage', label: '내 정보' }
  ];

  function isActive(path) {
    if (path === '/userpage') {
      return currentPath.includes('userpage');
    }
    return currentPath === path;
  }

  return (
    <nav className='navbar'>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link 
              className={isActive(item.path) ? 'active' : ''} 
              to={item.path}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
