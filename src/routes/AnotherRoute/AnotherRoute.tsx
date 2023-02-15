// @ts-nocheck
import React, { lazy, Suspense } from 'react';
const AnotherFeatureItem = lazy(
  () => import(/* webpackChunkName: "features.another" */ 'Features/AnotherFeature/AnotherFeatureItem'),
);
// import AnotherFeatureItem from 'Features/AnotherFeature/AnotherFeatureItem';

const AnotherRoute: React.FC = () => {
  return (
    <div className="anotherroute">
      <Suspense fallback={<>Feature Loading...</>}>
        <AnotherFeatureItem />
      </Suspense>
    </div>
  );
};

export default AnotherRoute;
