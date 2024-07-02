export const IS_TOUCH_DEVICE: boolean = (() => {
  if (typeof window === 'undefined') {
    return false;
  } else {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    );
  }
})();
