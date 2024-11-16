import type { FC, PropsWithChildren, RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { throttle } from 'lodash';

type Wrapper = 'div' | 'span';

const scrollIntoView = throttle(
  (element: HTMLElement) => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  },
  1000,
  {
    trailing: false,
  }
);

export interface ScrollIntoViewProps extends PropsWithChildren {
  value: boolean;
  onScrollIntoView?: () => void;
  wrapper?: Wrapper;
  className?: string;
}

export const ScrollIntoView: FC<ScrollIntoViewProps> = ({
  onScrollIntoView,
  className,
  children,
  wrapper,
  value,
}) => {
  const ref = useRef<HTMLDivElement | HTMLSpanElement>(null);

  useEffect(() => {
    if (value && ref.current) {
      const { top, bottom } = ref.current.getBoundingClientRect();
      const inView = top >= 0 && bottom <= window.innerHeight;

      if (!inView) {
        scrollIntoView(ref.current);

        onScrollIntoView?.();
      }
    }
  }, [onScrollIntoView, value]);

  if (wrapper === 'span') {
    return (
      <span ref={ref} className={className}>
        {children}
      </span>
    );
  }

  return (
    <div ref={ref as RefObject<HTMLDivElement>} className={className}>
      {children}
    </div>
  );
};
