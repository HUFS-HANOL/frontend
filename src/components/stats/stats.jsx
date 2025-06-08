import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './stats.css';
import Navbar from '../common/navbar/navbar';
import YearlyEmotion from './statistics/yearlyEmotion';
import MonthlyEmotion from './statistics/monthlyEmotion';
import YearlyHappiess from './statistics/yearlyHappiness';

function Stats() {
  return (
    <div>
      <Navbar />
      <div className='stats-container'>
        <YearlyEmotion />

        <MonthlyEmotion />

        <YearlyHappiess />
      </div>
    </div>
  );
}

export default Stats;
