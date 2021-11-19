import React from 'react';

/** Map 方法 */
const useMap = <K = any, T = any>(initialValue: Map<K, T>) => {
  const [map, setMap] = React.useState(new Map(initialValue));
  const actions = React.useMemo(
    () => ({
      set: (key: K, value: T) =>
        setMap((prevMap) => {
          const nextMap = new Map(prevMap);
          nextMap.set(key, value);
          return nextMap;
        }),
      remove: (key: K, value: T) =>
        setMap((prevMap) => {
          const nextMap = new Map(prevMap);
          nextMap.delete(key);
          return nextMap;
        }),
      clear: () => setMap(new Map()),
    }),
    [setMap],
  );
  return [map, actions];
};
export default useMap;
