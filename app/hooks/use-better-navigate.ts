import { useNavigate } from '@remix-run/react';

export function useBetterNavigate() {
  const navigate = useNavigate();

  return (fallback: string, ...args: Parameters<typeof navigate>) => {
    const path = location.pathname;

    navigate(...args);

    if (location.pathname === path) {
      navigate(fallback, {
        replace: true,
      });
    }
  };
}
