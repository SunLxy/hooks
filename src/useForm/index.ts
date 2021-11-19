import React from 'react';
/** 保存值集合 */
const useForm = (initialValue = {}) => {
  const [store, setStore] = React.useState({ ...initialValue });
  const onChange = (field: string, event: any) => {
    let value = event;
    if (event && event.target) {
      value = (event.target as HTMLInputElement).value;
    }
    setStore({ ...store, [field]: value });
  };
  return [store, onChange];
};
export default useForm;
