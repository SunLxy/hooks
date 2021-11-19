import React from 'react';
// 上一次的值
const usePrevious = <T = any>(initialState: T) => {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = initialState;
  });
  return [ref.current];
};
export default usePrevious;
