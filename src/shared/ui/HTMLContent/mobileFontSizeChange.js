function mobileFontSizeChange(fontSize) {
  window.addEventListener("DOMContentLoaded", () => {
    if (typeof fontSize !== "number") return;
    const wrapper = document.querySelector(".wrapper");
    if (wrapper instanceof HTMLElement) {
      wrapper.style = `font-style: ${fontSize}px`;
    }
  });
}
