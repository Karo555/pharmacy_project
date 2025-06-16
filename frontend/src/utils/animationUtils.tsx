import { useEffect, useRef, useState } from 'react';

// Hook for detecting when an element enters the viewport
export const useInView = (options?: IntersectionObserverInit) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Update state when intersection status changes
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.2, // Trigger when 20% of the element is visible
      rootMargin: '0px',
      ...options
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return { ref, isInView };
};

// Animation wrapper component
interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  animation,
  delay = 0,
  threshold = 0.2,
  rootMargin = '0px',
  className = '',
}) => {
  const { ref, isInView } = useInView({
    threshold,
    rootMargin,
  });

  return (
    <div
      ref={ref}
      className={`${className} ${isInView ? animation : 'opacity-0'}`}
      style={{
        transition: `all 0.6s ease-out ${delay}s`,
        opacity: isInView ? 1 : 0
      }}
    >
      {children}
    </div>
  );
};
