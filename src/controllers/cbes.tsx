import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CbesForm from '../views/Form';


const CbesRouter: React.FC = () => (

  <Routes>
    <Route path="/CbesForm" element={<CbesForm />} />

  </Routes>
);

export default CbesRouter;
