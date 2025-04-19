import { useEffect, useRef } from 'react';

export function useDidMount(callback: () => void) {
  useEffect(() => {
    callback();
  }, []);
}

export function useDidUpdate(callback: () => void, deps: any[]) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    callback();
  }, deps);
} 