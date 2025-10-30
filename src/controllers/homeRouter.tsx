import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../views/HomePage';


const HomeRouter: React.FC = () => (

  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/home" element={<HomePage />} />
  </Routes>
);

export default HomeRouter;
