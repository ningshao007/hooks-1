import { useCallback, useState } from 'react';

/**
 * 
 * @returns 返回一个强制刷新视图的函数 
 */
const useUpdate = () => {
  const [, setState] = useState({});

  return useCallback(() => setState({}), []);
};

export default useUpdate;
