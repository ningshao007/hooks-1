import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

/** 
 * Map的值可以是任何类型
 * Map中的键是有序的,而对象并不是
 * Map在频繁增删操作中性能更好
 */
function useMap<K, T>(initialValue?: Iterable<readonly [K, T]>) {
  const getInitValue = () => {
    return initialValue === undefined ? new Map() : new Map(initialValue);
  };

  const [map, setMap] = useState<Map<K, T>>(() => getInitValue());

  const set = (key: K, entry: T) => {
    setMap((prev) => {
      const temp = new Map(prev);
      temp.set(key, entry);
      return temp;
    });
  };

  const setAll = (newMap: Iterable<readonly [K, T]>) => {
    setMap(new Map(newMap));
  };

  const remove = (key: K) => {
    setMap((prev) => {
      const temp = new Map(prev);
      temp.delete(key);
      return temp;
    });
  };

  const reset = () => setMap(getInitValue());

  const get = (key: K) => map.get(key);

  return [
    map,
    {
      set: useMemoizedFn(set),
      setAll: useMemoizedFn(setAll),
      remove: useMemoizedFn(remove),
      reset: useMemoizedFn(reset),
      get: useMemoizedFn(get),
    },
  ] as const;
}

export default useMap;
