import React from 'react';
/** ComponentDidUpdate  */
const useComponentDidUpdate = (
  callback: React.EffectCallback,
  deep: React.DependencyList,
) => {
  const mounted = React.useRef(false);
  React.useEffect(() => {
    if (mounted.current) {
      callback();
    } else {
      mounted.current = true;
    }
  }, deep);
};
export default useComponentDidUpdate;
