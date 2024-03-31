import React, { Suspense } from 'react';
import { formats } from  '../../../plugins/formats';

function MyComponent ({path}){
  if (!path) {
    return <div>Path is not defined.</div>;
  }
  const fileExtension = path.split('/').pop().split('.').pop(); 
  let DynamicComponent;
  console.log(fileExtension);
  if (formats.includes(fileExtension)) {
    DynamicComponent = React.lazy(() => import(`../../../plugins/${fileExtension}/${fileExtension}.jsx`).catch(() => import('./index.jsx')));
  } else {
    DynamicComponent = React.lazy(() => import('./index.jsx'));
  }
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {DynamicComponent ? <DynamicComponent file={path}/> : null}
    </Suspense>
  );
}

export default MyComponent;
