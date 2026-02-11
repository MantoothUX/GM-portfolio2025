import * as React from 'react';

export type Breakpoint = 'phone' | 'tablet' | 'desktop';

const PHONE_MAX = 480;
const TABLET_MAX = 1023;

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>('desktop');

  React.useEffect(() => {
    const phoneQuery = window.matchMedia(`(max-width: ${PHONE_MAX}px)`);
    const tabletQuery = window.matchMedia(`(min-width: ${PHONE_MAX + 1}px) and (max-width: ${TABLET_MAX}px)`);

    const update = () => {
      const width = window.innerWidth;
      if (width <= PHONE_MAX) {
        setBreakpoint('phone');
      } else if (width <= TABLET_MAX) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    phoneQuery.addEventListener('change', update);
    tabletQuery.addEventListener('change', update);
    update();

    return () => {
      phoneQuery.removeEventListener('change', update);
      tabletQuery.removeEventListener('change', update);
    };
  }, []);

  return breakpoint;
}
