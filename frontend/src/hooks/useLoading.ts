import {
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

export function useLoading(): [
  boolean,
  <T>(promise: Promise<T>) => Promise<T>
] {
  const [loading, setLoading] = useState(false);
  const startTransition = useCallback(async <T>(promise: Promise<T>) => {
    try {
      flushSync(() => setLoading(true));
      const data = await promise;
      return data;
    } finally {
      setLoading(false);
    }
  }, []);
  return useMemo(() => [loading, startTransition], [loading, startTransition]);
}
