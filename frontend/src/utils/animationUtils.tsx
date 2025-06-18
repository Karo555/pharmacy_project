import React from 'react';
import { useInView } from 'react-intersection-observer';

export interface AnimateOnScrollProps {
    /** children to wrap */
    children: React.ReactNode;
    /** Animate.css animation name, e.g. "animate__fadeInUp" */
    animation: string;
    /** fraction of element visible to trigger (0–1) */
    threshold?: number;
    /** delay in seconds */
    delay?: number;
}

/**
 * Wraps its children in a div that adds Animate.css classes
 * when scrolled into view.
 */
export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
                                                                    children,
                                                                    animation,
                                                                    threshold = 0.1,
                                                                    delay = 0,
                                                                }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold });

    return (
        <div
            ref={ref}
    className={inView ? `animate__animated ${animation}` : undefined}
    style={{ animationDelay: `${delay}s` }}
>
    {children}
    </div>
);
};
