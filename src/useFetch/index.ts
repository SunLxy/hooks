import React from 'react';
import useStore from './../useStore';
/** fetch 请求 */
const useFetch = (url: RequestInfo, options?: RequestInit) => {
  // 状态值存储
  const store = useStore<{
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
    store.setValue({ ...store.store, loading: true });
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      store.setValue({ data: json, error: undefined, loading: false });
    } catch (err: any) {
      store.setValue({
        ...store.store,
        error: err,
        loading: false,
      });
      return;
    }
  };
  return {
    ...store,
    run,
  };
};
export default useFetch;
