import type { MutableRefObject } from 'react';
import { useEffect, useRef } from 'react';

/**
 *
 * @param value 想要返回的值
 * @returns 返回值的最新引用
 */
function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

export default useLatest;

/**
 * @description 这是另一个版本的实现, 区别在于是否需要useEffect -> Refs should not be mutated outside of useEffect or an event handler as they will not be compatible with concurrent mode
 */
export const useLatest1 = <T>(value: T): MutableRefObject<T> => {
  const latest = useRef(value);

  /**
   * 这里增加了useEffect,latest的值修改会慢一些
   */
  useEffect(() => {
    latest.current = value;
  }, [value]);

  return latest;
};
