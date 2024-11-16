export function isbot(userAgent?: string | null) {
  if (!userAgent) {
    return false;
  }

  return /bot|googlebot|crawler|spider|robot|crawling/i.test(userAgent);
}
