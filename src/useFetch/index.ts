import React from 'react';
/** fetch 请求 */
const useFetch = (url: RequestInfo, options?: RequestInit) => {
  // 状态值存储
  const [store, setStore] = React.useState<{
    loading: boolean;
    error: Error | undefined;
    data: any;
  }>({
    loading: false,
    error: undefined,
    data: undefined,
  });
  // 接口请求
  const run = async () => {
    setStore({ ...store, loading: true });
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      setStore({ data: json, error: undefined, loading: false });
    } catch (err: any) {
      setStore({
        ...store,
        error: err,
        loading: false,
      });
      return;
    }
    setStore({ ...store, loading: false });
  };
  return {
    ...store,
    run,
  };
};
export default useFetch;
