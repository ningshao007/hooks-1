import ResizeObserver from 'resize-observer-polyfill';
import useRafState from '../useRafState';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useIsomorphicLayoutEffectWithTarget from '../utils/useIsomorphicLayoutEffectWithTarget';

type Size = { width: number; height: number };

function useSize(target: BasicTarget): Size | undefined {
  const [state, setState] = useRafState<Size>();

  useIsomorphicLayoutEffectWithTarget(
    () => {
      const el = getTargetElement(target);

      if (!el) {
        return;
      }

      // ResizeObserver避免了在自身回调中调整大小,从而触发的无限架设和循环依赖.这个api性能会更好
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { clientWidth, clientHeight } = entry.target;
          setState({
            width: clientWidth,
            height: clientHeight,
          });
        });
      });

      // 开始观察el
      resizeObserver.observe(el);

      // 结束观察el
      return () => {
        resizeObserver.disconnect();
      };
    },
    [],
    target,
  );

  return state;
}

export default useSize;
