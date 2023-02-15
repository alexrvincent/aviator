// @ts-nocheck
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
// 1. Import New Routes Here
const HelloRoute = React.lazy(() => import(/* webpackChunkName: "routes.hello" */ 'Routes/HelloRoute'));
const AnotherRoute = React.lazy(() => import(/* webpackChunkName: "routes.another" */ 'Routes/AnotherRoute'));

const Router: React.FC = () => {
  return (
    <Suspense fallback={<>Route Loading...</>}>
      <Routes>
        <Route path="" element={<HelloRoute />} />
        {/* 2. Add New Routes Here */}
        <Route path="/another" element={<AnotherRoute />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Suspense>
  );
};

export default Router;
