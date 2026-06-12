import { useEffect, useCallback, useState } from "react";

export function useScrollEvent(cb: () => void, deps: unknown[] = []) {
  useEffect(() => {
    cb();
    window.addEventListener("scroll", cb, { passive: true });
    return () => window.removeEventListener("scroll", cb);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useScrollEvent(
    useCallback(() => setScrollY(window.scrollY), []),
    [],
  );

  return scrollY;
}

export function useScrolledPast(threshold = 20) {
  const [isScrolled, setIsScrolled] = useState(false);

  useScrollEvent(
    useCallback(() => setIsScrolled(window.scrollY > threshold), [threshold]),
    [threshold],
  );

  return isScrolled;
}
