// @ts-nocheck
import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import useAppContext from 'Hooks/useAppContext';
// 1. Import New Routes Here
const HelloRoute = React.lazy(() => import(/* webpackChunkName: "hello" */ 'Routes/HelloRoute'));
const AnotherRoute = React.lazy(() => import(/* webpackChunkName: "another" */ 'Routes/AnotherRoute'));

const Router: React.FC = () => {
  const { isServer } = useAppContext();
  const RRlocation = useLocation();

  if (isServer) {
    console.log('React Server Side Rendering');
    console.log(RRlocation);
  } else {
    console.log('React Client Side Rendering');
    console.log(RRlocation);
  }

  return (
    <Suspense fallback={<>Route Loading...</>}>
      <Routes>
        <Route path="" element={<HelloRoute />} />
        {/* 2. Add New Routes Here */}
        <Route path="/another-route" element={<AnotherRoute />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Suspense>
  );
};

export default Router;
