import type { DependencyList } from 'react';
import { useEffect } from 'react';
import { isFunction } from '../utils';

/**
 * @description 其实就是简单的useEffect函数,简化结合了async函数使用
 * @param effect 传入的async 函数
 * @param deps 依赖的更新变量
 */
function useAsyncEffect(
  effect: () => AsyncGenerator<void, void, void> | Promise<void>,
  deps?: DependencyList,
) {
  // 判断是否是gen函数
  function isAsyncGenerator(
    val: AsyncGenerator<void, void, void> | Promise<void>,
  ): val is AsyncGenerator<void, void, void> {
    return isFunction(val[Symbol.asyncIterator]);
  }

  useEffect(() => {
    const e = effect();
    let cancelled = false;

    async function execute() {
      if (isAsyncGenerator(e)) {
        while (true) {
          const result = await e.next();
          if (result.done || cancelled) {
            break;
          }
        }
      } else {
        await e;
      }
    }

    execute();

    return () => {
      cancelled = true;
    };
  }, deps);
}

export default useAsyncEffect;
