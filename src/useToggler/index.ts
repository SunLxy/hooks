import React from 'react';
/** true false 取反 */
const useToggler = (initialState: boolean) => {
  const [value, setValue] = React.useState<boolean>(initialState);
  const toggleValue = React.useCallback(() => setValue((prev) => !prev), []);
  return [value, toggleValue];
};
export default useToggler;
