import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from './ThemeContext';

export default function ThemeContextWrapper({ children }: {children: JSX.Element}) {
  const [theme, setTheme] = useState<string>(themes.dark);

  const changeTheme = (theme: string): void => {
    setTheme(theme);
  }

  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.body.classList.add('white-content');
        break;
      case themes.dark:
      default:
        document.body.classList.remove('white-content');
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}