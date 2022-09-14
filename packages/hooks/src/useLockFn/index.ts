import { useRef, useCallback } from 'react';

/**
 *
 * @param fn 异步函数
 * @returns 给异步函数增加竞态锁,在这个函数执行完毕前,所有的动作将会被忽略
 */
function useLockFn<P extends any[] = any[], V extends any = any>(fn: (...args: P) => Promise<V>) {
  const lockRef = useRef(false);

  return useCallback(
    async (...args: P) => {
      if (lockRef.current) return;
      lockRef.current = true;

      try {
        const ret = await fn(...args);
        lockRef.current = false;
        return ret;
      } catch (e) {
        lockRef.current = false;
        throw e;
      }
    },

    [fn],
  );
}

export default useLockFn;
