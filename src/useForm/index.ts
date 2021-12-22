import React from 'react';
import useStore from './../useStore';

/** 保存值集合 */
const useForm = (initialValue = {}) => {
  const store = useStore({ ...initialValue });
  const onChange = (field: string, event: any) => {
    let value = event;
    if (event && event.target) {
      value = event.target.value;
    }
    store.setValue({ ...store.store, [field]: value });
    // setStore((pre) => ({ ...pre, [field]: value }));
  };
  return [store.store, onChange];
};
export default useForm;
