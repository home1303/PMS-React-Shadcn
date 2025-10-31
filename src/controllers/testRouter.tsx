import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Test from "@/views/Test-UI/test"


const HomeRouter: React.FC = () => (

  <Routes>
    <Route path="/test-ui" element={<Test />} />
  </Routes>
);

export default HomeRouter;
