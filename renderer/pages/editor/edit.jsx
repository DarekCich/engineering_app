import React, { Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { formats } from  '../../../plugins/formats'
const MyComponent = () =>  {
  const router = useRouter();
  const { parametr } = router.query;
  const x = String(parametr)
  const fileExtension = x.split('/').pop().split('.').pop(); 
  let DynamicComponent
  // const pluginPath = formats.includes(fileExtension) ? `../../../plugins/${fileExtension}/${fileExtension}` : './index'
  if (formats.includes(fileExtension))
    DynamicComponent = React.lazy(() => import(`../../../plugins/${fileExtension}/${fileExtension}`));
  else
    DynamicComponent = React.lazy(() => import('./index'));
  
  
    return (
    <div>
        <div>
         <Link href="/home">Home</Link>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          {DynamicComponent ? <DynamicComponent /> : null}
      </Suspense>
    </div>
  );
}

export default MyComponent;
