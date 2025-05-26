import { Main, Calendar, Today, Stats, FavPoems, LoginPage, SignupPage } from './components';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/today" element={<Today />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/favPoems" element={<FavPoems />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;