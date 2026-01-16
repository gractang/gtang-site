const root = document.documentElement;
const storageKey = "theme-preference";
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

const setTheme = (theme) => {
  root.dataset.theme = theme;
};

const getPreferredTheme = () => (mediaQuery.matches ? "dark" : "light");

const storedTheme = localStorage.getItem(storageKey);
setTheme(storedTheme || getPreferredTheme());

const toggle = document.querySelector(".theme-toggle");
toggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem(storageKey, nextTheme);
  setTheme(nextTheme);
  document.body.classList.remove("theme-fade");
  void document.body.offsetWidth;
  document.body.classList.add("theme-fade");
  window.setTimeout(() => {
    document.body.classList.remove("theme-fade");
  }, 300);
});

mediaQuery.addEventListener("change", (event) => {
  if (!localStorage.getItem(storageKey)) {
    setTheme(event.matches ? "dark" : "light");
  }
});
