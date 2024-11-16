// Custom setTimeout function that mitigate the issue of built-in setTimeout function
// which doesn't let you set the delay more than 2147483647 milliseconds.

export function bigSetTimeout(callback: (args: void) => void, ms = 0) {
  let timeoutId: ReturnType<typeof globalThis.setTimeout>;
  let remaining: bigint = BigInt(ms);
  const maxInt = 2147483647;

  const run = () => {
    if (remaining <= maxInt) {
      timeoutId = globalThis.setTimeout(callback, Number(remaining));
      return;
    }

    timeoutId = globalThis.setTimeout(run, maxInt);
    remaining -= BigInt(maxInt);
  };

  run();

  return () => clearTimeout(timeoutId);
}
