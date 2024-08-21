const button = document.getElementById('wenexus_scrollToTopBtn');

// Detecting both user agent and screen size
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const screenWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

window.addEventListener(
  'scroll',
  () => {
    const scrollTop = document.scrollingElement?.scrollTop;
    if (button && scrollTop) {
      if (isMobile || screenWidth < 768) {
        if (button.attributes?.mobile.value === 'false') {
          button.style.display = 'none';
        } else {
          button.style.display = scrollTop > 150 ? 'block' : 'none';
        }
      } else {
        if (button.attributes?.desktop.value === 'false') {
          button.style.display = 'none';
        } else {
          button.style.display = scrollTop > 150 ? 'block' : 'none';
        }
      }
    }
  },
  {
    passive: true,
  }
);

button &&
  button.addEventListener('click', () => {
    document.body.scrollIntoView({
      block: 'start',
      inline: 'nearest',
      behavior: 'smooth',
    });
  });
