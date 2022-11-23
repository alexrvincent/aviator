// @ts-nocheck
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// 1. Import New Routes Here
import HelloRoute from 'Routes/HelloRoute';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<HelloRoute />} />
      {/* 2. Add New Routes Here */}
      {/* <Route path="/another-route" element={<AnotherRoute/>} /> */}
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
};

export default Router;
