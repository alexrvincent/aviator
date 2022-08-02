// @ts-nocheck
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. Import New Routes Here
import HelloRoute from 'Routes/HelloRoute';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelloRoute />} />
        {/* 2. Add New Routes Here */}
        {/* <Route path="/another-route" element={<AnotherRoute/>} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
