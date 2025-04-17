import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/main'; 
import './css/main.css';  
import Calendar from './components/calendar';
import './css/calendar.css';  
import Today from './components/today';  
import './css/today.css';  
import Stats from './components/stats'; 
import './css/stats.css';  
import UserPage from './components/userpage'; 
import './css/userpage.css';  
import Loading from './components/loading'; 
import './css/loading.css';  
import LikedDiaries from './components/likedDiaries'; 
import './css/likedDiaries.css';  
import LikedPoems from './components/likedPoems'; 
import './css/likedPoems.css';  

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/today" element={<Today />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/userpage" element={<UserPage />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/likedDiaries" element={<LikedDiaries />} />
            <Route path="/likedPoems" element={<LikedPoems />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
