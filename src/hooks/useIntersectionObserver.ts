import { RefObject, useEffect } from "react";

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.8
};

type Props = {
  callback: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;
  ref: RefObject<HTMLElement | null>;
}

export default function useIntersectionObserver({ callback, ref }: Props) {
  useEffect(() => {
    let observerRefValue = null;

    const observer = new IntersectionObserver(
      (entries) => callback(entries, observer),
      observerOptions
    );

    if (ref.current) {
      observer.observe(ref.current);
      observerRefValue = ref.current;
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [callback, ref]);

  return null;
}
