const THEME_BOOTSTRAP_SCRIPT = `(() => {
  const storageKey = "theme";
  const root = document.documentElement;
  if (!root) {
    return;
  }

  const classNames = ["light", "dark"];
  const apply = (theme) => {
    classNames.forEach((name) => root.classList.remove(name));
    root.classList.add(theme);
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  };

  let theme = null;
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === "light" || stored === "dark") {
      theme = stored;
    }
  } catch (error) {
    theme = null;
  }

  if (!theme && window.matchMedia) {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  apply(theme || "light");
})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />;
}
