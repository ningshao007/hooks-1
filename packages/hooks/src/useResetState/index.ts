import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useMemoizedFn from '../useMemoizedFn';

type ResetState = () => void;

const useResetState = <S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, ResetState] => {
  const [state, setState] = useState(initialState);

  // 这里不需要用useRef来保证新值,hooks的一大特点是捕获旧值,最初始initialState值
  const resetState = useMemoizedFn(() => {
    setState(initialState);
  });

  return [state, setState, resetState];
};

export default useResetState;
