"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  hasUserPreference: boolean;
}

const PREFERS_DARK_QUERY = "(prefers-color-scheme: dark)";
const THEME_STORAGE_KEY = "theme";

function readStoredTheme(): Theme | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;
  } catch {
    return null;
  }
}

function persistTheme(theme: Theme) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignored – localStorage might be unavailable (e.g. in private mode)
  }
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "light";
  }

  return window.matchMedia(PREFERS_DARK_QUERY).matches ? "dark" : "light";
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const storedTheme = readStoredTheme();
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof document !== "undefined") {
      const current = document.documentElement.dataset.theme;
      if (current === "light" || current === "dark") {
        return current;
      }
    }

    return storedTheme ?? "light";
  });
  const [hasUserPreference, setHasUserPreference] = useState<boolean>(() => storedTheme !== null);
  const hasUserPreferenceRef = useRef(hasUserPreference);

  useEffect(() => {
    hasUserPreferenceRef.current = hasUserPreference;
  }, [hasUserPreference]);

  useEffect(() => {
    const initialStoredTheme = readStoredTheme();
    if (initialStoredTheme) {
      setThemeState(initialStoredTheme);
      setHasUserPreference(true);
      return;
    }

    setHasUserPreference(false);
    setThemeState(getSystemTheme());
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia(PREFERS_DARK_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      if (hasUserPreferenceRef.current) {
        return;
      }

      setThemeState(event.matches ? "dark" : "light");
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) {
        return;
      }

      if (event.newValue === "light" || event.newValue === "dark") {
        setHasUserPreference(true);
        setThemeState(event.newValue);
        return;
      }

      setHasUserPreference(false);
      setThemeState(getSystemTheme());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    setHasUserPreference(true);
    setThemeState(() => {
      persistTheme(nextTheme);
      return nextTheme;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setHasUserPreference(true);
    setThemeState((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      persistTheme(nextTheme);
      return nextTheme;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      hasUserPreference,
    }),
    [theme, setTheme, toggleTheme, hasUserPreference],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
