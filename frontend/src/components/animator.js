import { useEffect, useRef } from "react";

export const useScrollAnimation = (ani_class = "animate", delay = 0) => {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(ani_class);
            }, delay);
            observer.unobserve(entry.target); // only animate once
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ani_class, delay]);

  return ref;
};
