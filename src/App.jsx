import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Main,
  Calendar,
  Today,
  Stats,
  UserPage,
  LikedDiaries,
  LikedPoems,
  LoginPage,
  SignupPage,
} from './components';

function App() {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/today' element={<Today />} />
            <Route path='/stats' element={<Stats />} />
            <Route path='/userpage' element={<UserPage />} />
            <Route path='/userpage/likedDiaries' element={<LikedDiaries />} />
            <Route path='/userpage/likedPoems' element={<LikedPoems />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
