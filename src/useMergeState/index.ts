import React from 'react';

type NewStateType = Function | object;

/** 状态值合并 对象的数据  initialState 为初始值 */
const useMergeState = <T = { [k: string]: any }>(initialState: T) => {
  // 状态值
  const [value, setValue] = React.useState(initialState || {});
  // 更新值的方法
  const mergeState = (newState: NewStateType) => {
    if (typeof newState === 'function') newState = newState(value);
    setValue({ ...value, ...newState });
  };
  return [value, mergeState];
};
export default useMergeState;
