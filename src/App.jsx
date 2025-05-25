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
import PrivateRoute from './components/common/privateRoute/privateRoute';
import { AuthProvider } from './stores/authContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className='App'>
          <header className='App-header'>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route
                path='/calendar'
                element={
                  <PrivateRoute>
                    <Calendar />
                  </PrivateRoute>
                }
              />
              <Route
                path='/today'
                element={
                  <PrivateRoute>
                    <Today />
                  </PrivateRoute>
                }
              />
              <Route
                path='/stats'
                element={
                  <PrivateRoute>
                    <Stats />
                  </PrivateRoute>
                }
              />
              <Route
                path='/userpage'
                element={
                  <PrivateRoute>
                    <UserPage />
                  </PrivateRoute>
                }
              />
              <Route
                path='/userpage/likedDiaries'
                element={
                  <PrivateRoute>
                    <LikedDiaries />
                  </PrivateRoute>
                }
              />
              <Route
                path='/userpage/likedPoems'
                element={
                  <PrivateRoute>
                    <LikedPoems />
                  </PrivateRoute>
                }
              />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
            </Routes>
          </header>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
