export function scrollWindowToTop(behavior: ScrollBehavior = "smooth") {
  window &&
    window.scrollTo({
      top: 0,
      behavior,
    });
}
