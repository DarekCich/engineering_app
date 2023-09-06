import React, { Suspense } from 'react';
import { formats } from  '../../../plugins/formats'
const MyComponent = ({path}) =>  {
  const fileExtension = path.split('/').pop().split('.').pop(); 
  let DynamicComponent
  if (formats.includes(fileExtension))
    DynamicComponent = React.lazy(() => import(`../../../plugins/${fileExtension}/${fileExtension}`));
  else
    DynamicComponent = React.lazy(() => import('./index'));
  
  
    return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {DynamicComponent ? <DynamicComponent /> : null}
      </Suspense>
    </div>
  );
}

export default MyComponent;
