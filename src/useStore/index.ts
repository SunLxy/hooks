import React from 'react';

class Store {
  // 状态存储
  private stores: any;
  // 用于页面重新渲染
  private forceUpdate: () => void;

  constructor(props: any, forceUpdate: () => void) {
    this.stores = props;
    this.forceUpdate = forceUpdate;
  }
  // 更新状态
  setValue = (value: any) => {
    this.stores = value;
    if (this.forceUpdate) {
      this.forceUpdate();
    }
  };
  // 获取值
  get store() {
    return this.stores;
  }
}

const useStore = <T = any>(init?: T) => {
  const [_, setTime] = React.useState('');
  // 用于组件更新
  const forceUpdate = () => {
    setTime(new Date().getTime().toString());
  };
  const store = React.useMemo(() => new Store(init, forceUpdate), []);
  return store;
};
export default useStore;

export const useRefStore = <T = any>(init?: T) => {
  const Ref: React.MutableRefObject<T | undefined> = React.useRef(init);
  const [_, setTime] = React.useState('');
  // 用于组件更新
  const forceUpdate = () => {
    setTime(new Date().getTime().toString());
  };
  const setStore = (value: any) => {
    Ref.current = value;
    forceUpdate();
  };
  return [Ref, setStore];
};
