import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useMemo, useState } from 'react';
import useToggle from '../useToggle';

export interface Actions {
  setTrue: () => void;
  setFalse: () => void;
  set: (value: boolean) => void;
  toggle: () => void;
}

export default function useBoolean(defaultValue = false): [boolean, Actions] {
  const [state, { toggle, set }] = useToggle(defaultValue);

  const actions: Actions = useMemo(() => {
    const setTrue = () => set(true);
    const setFalse = () => set(false);
    return {
      toggle,
      set: (v) => set(!!v),
      setTrue,
      setFalse,
    };
  }, []);

  return [state, actions];
}

interface IReturnType {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

export function useBoolean1(defaultValue?: boolean): IReturnType {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((x) => !x), []);

  return { value, setValue, setTrue, setFalse, toggle };
}
